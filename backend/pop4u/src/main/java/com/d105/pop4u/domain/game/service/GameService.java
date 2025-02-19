package com.d105.pop4u.domain.game.service;

import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import com.d105.pop4u.domain.game.dto.GameCompletionEvent;
import com.d105.pop4u.domain.game.dto.GameInfo;
import com.d105.pop4u.domain.game.dto.GameStatus;
import com.d105.pop4u.domain.game.dto.RankingEntry;
import com.d105.pop4u.domain.user.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class GameService {
    private static final String GAME_PREFIX = "game:";
    private static final String CLICK_COUNT_PREFIX = GAME_PREFIX + "clicks:";
    private static final String RANKINGS_PREFIX = GAME_PREFIX + "rankings:";
    private static final String STATUS_PREFIX = GAME_PREFIX + "status:";
    private static final int GAME_DURATION_SECONDS = 10;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private PopupStoreRepository popupStoreRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserService userService; // 사용자 서비스 추가

    public GameInfo initializeGame(String popupId, LocalDateTime startTime) throws JsonProcessingException {
        // 팝업스토어 존재 여부 확인
        if (!popupStoreRepository.existsById(Long.parseLong(popupId))) {
            log.error("존재하지 않는 팝업스토어입니다: {}", popupId);
            throw new IllegalArgumentException("존재하지 않는 팝업스토어입니다.");
        }

        String statusKey = STATUS_PREFIX + popupId;
        GameStatus status = new GameStatus(startTime, startTime.plusSeconds(GAME_DURATION_SECONDS));

        String statusJson = objectMapper.writeValueAsString(status);
        redisTemplate.opsForValue().set(statusKey, statusJson);

        clearPreviousGameData(popupId);

        return new GameInfo(status, popupId);
    }

    private void clearPreviousGameData(String popupId) {
        String clickPattern = CLICK_COUNT_PREFIX + popupId + ":*";
        Set<String> keys = redisTemplate.keys(clickPattern);
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
        redisTemplate.delete(RANKINGS_PREFIX + popupId);
    }

    public GameStatus getGameStatus(String popupId) {
        // 팝업스토어 존재 여부 확인
        if (!popupStoreRepository.existsById(Long.parseLong(popupId))) {
            throw new IllegalArgumentException("존재하지 않는 팝업스토어입니다.");
        }

        try {
            String statusKey = STATUS_PREFIX + popupId;
            String statusJson = redisTemplate.opsForValue().get(statusKey);

            if (statusJson == null) {
                return null;
            }

            return objectMapper.readValue(statusJson, GameStatus.class);
        } catch (JsonProcessingException e) {
            log.error("Error getting game status: {}", e.getMessage());
            throw new RuntimeException("Error getting game status", e);
        }
    }

    public boolean isGameActive(String popupId) {
        // 팝업스토어 존재 여부 확인
        if (!popupStoreRepository.existsById(Long.parseLong(popupId))) {
            throw new IllegalArgumentException("존재하지 않는 팝업스토어입니다.");
        }

        GameStatus status = getGameStatus(popupId);
        if (status == null) {
            return false;
        }

        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(status.getStartTime()) &&
                now.isBefore(status.getEndTime());
    }

    @Transactional
    public void processGameCompletions(List<GameCompletionEvent> completions) {
        log.info("Service - 게임 완료 처리 시작 - events: {}", completions);

        Map<String, List<GameCompletionEvent>> completionsByStore = completions.stream()
                .collect(Collectors.groupingBy(GameCompletionEvent::getPopupId));

        log.info("Service - Store별 게임 완료 그룹핑: {}", completionsByStore);

        completionsByStore.forEach((popupId, storeCompletions) -> {
            String rankingKey = RANKINGS_PREFIX + popupId;
            log.info("Service - Redis 랭킹 저장 시작 - key: {}", rankingKey);

            storeCompletions.forEach(completion -> {
                double score = completion.getCompletionTime().toEpochSecond(ZoneOffset.UTC);
                boolean success = redisTemplate.opsForZSet().add(
                        rankingKey,
                        completion.getUserId().toString(),
                        score
                );
                log.info("Service - Redis 저장 결과 - key: {}, value: {}, score: {}, success: {}",
                        rankingKey, completion.getUserId(), score, success);
            });
        });
    }

    public List<RankingEntry> getRankings(String popupId) {
        // 팝업스토어 존재 여부 확인
        if (!popupStoreRepository.existsById(Long.parseLong(popupId))) {
            throw new IllegalArgumentException("존재하지 않는 팝업스토어입니다.");
        }

        String rankingKey = RANKINGS_PREFIX + popupId;
        Set<ZSetOperations.TypedTuple<String>> rankingSet;
        try {
            rankingSet = redisTemplate.opsForZSet().rangeWithScores(rankingKey, 0, 4);
        } catch (Exception e) {
            throw new RuntimeException("랭킹 조회 중 오류가 발생했습니다.", e);
        }

        if (rankingSet == null || rankingSet.isEmpty()) {
            return new ArrayList<>();
        }

        List<RankingEntry> rankings = new ArrayList<>();
        int rank = 1;

        for (ZSetOperations.TypedTuple<String> tuple : rankingSet) {
            Long userId = Long.parseLong(tuple.getValue());
            LocalDateTime completionTime = LocalDateTime.ofEpochSecond(tuple.getScore().longValue(), 0, ZoneOffset.UTC);

            RankingEntry entry = new RankingEntry(userId, completionTime);
            entry.setNickname(userService.getUserNicknameById(userId)); // 사용자 닉네임 설정
            entry.setRank(rank++);
            rankings.add(entry);
        }


        return rankings;
    }
}
