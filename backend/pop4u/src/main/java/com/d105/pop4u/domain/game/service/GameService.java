package com.d105.pop4u.domain.game.service;

import com.d105.pop4u.domain.game.dto.GameClickResult;
import com.d105.pop4u.domain.game.dto.GameCompletionEvent;
import com.d105.pop4u.domain.game.dto.GameInfo;
import com.d105.pop4u.domain.game.dto.GameStatus;
import com.d105.pop4u.domain.game.dto.RankingEntry;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
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
    private PopupRepository popupRepository;  // 또는 PopupService

    @Autowired
    private ObjectMapper objectMapper;

    public GameInfo initializeGame(String popupId, LocalDateTime startTime) throws JsonProcessingException {
        String statusKey = STATUS_PREFIX + popupId;
        GameStatus status = new GameStatus(startTime, startTime.plusSeconds(GAME_DURATION_SECONDS));

        String statusJson = objectMapper.writeValueAsString(status);
        redisTemplate.opsForValue().set(statusKey, statusJson);

        // 이전 게임 데이터 초기화
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
        GameStatus status = getGameStatus(popupId);
        if (status == null) {
            return false;
        }

        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(status.getStartTime()) &&
                now.isBefore(status.getEndTime());
    }

    public GameClickResult processClick(String popupId, Long userId) {
        if (!isGameActive(popupId)) {
            return new GameClickResult(0, false, null);
        }

        String clickKey = CLICK_COUNT_PREFIX + popupId + ":" + userId;

        return redisTemplate.execute(new SessionCallback<GameClickResult>() {
            @Override
            @SuppressWarnings("unchecked")
            public GameClickResult execute(RedisOperations operations) {
                operations.multi();

                String currentClicksStr = (String) operations.opsForValue().get(clickKey);
                int currentClicks = currentClicksStr != null ? Integer.parseInt(currentClicksStr) : 0;

                if (currentClicks >= 10) {
                    operations.discard();
                    return new GameClickResult(currentClicks, false, null);
                }

                int newClickCount = currentClicks + 1;
                operations.opsForValue().set(clickKey, String.valueOf(newClickCount));

                operations.exec();

                boolean completed = newClickCount == 10;
                LocalDateTime completionTime = completed ? LocalDateTime.now() : null;

                return new GameClickResult(newClickCount, completed, completionTime);
            }
        });
    }

    @Transactional
    public void processGameCompletions(List<GameCompletionEvent> completions) {
        Map<String, List<GameCompletionEvent>> completionsByStore = completions.stream()
                .collect(Collectors.groupingBy(GameCompletionEvent::getPopupId));

        completionsByStore.forEach((popupId, storeCompletions) -> {
            String rankingKey = RANKINGS_PREFIX + popupId;

            // 완료 시간을 score로 사용하여 정렬
            storeCompletions.forEach(completion -> {
                double score = completion.getCompletionTime().toEpochSecond(ZoneOffset.UTC);
                redisTemplate.opsForZSet().add(
                        rankingKey,
                        completion.getUserId().toString(),
                        score
                );
            });
        });
    }

    public List<RankingEntry> getRankings(String popupId) {
        String rankingKey = RANKINGS_PREFIX + popupId;
        Set<ZSetOperations.TypedTuple<String>> rankingSet =
                redisTemplate.opsForZSet().rangeWithScores(rankingKey, 0, 4);

        if (rankingSet == null || rankingSet.isEmpty()) {
            return new ArrayList<>();
        }

        List<RankingEntry> rankings = new ArrayList<>();
        int rank = 1;

        for (ZSetOperations.TypedTuple<String> tuple : rankingSet) {
            RankingEntry entry = new RankingEntry();
            entry.setUserId(Long.parseLong(tuple.getValue()));
            entry.setCompletionTime(
                    LocalDateTime.ofEpochSecond(
                            tuple.getScore().longValue(),
                            0,
                            ZoneOffset.UTC
                    )
            );
            entry.setRank(rank++);
            rankings.add(entry);
        }

        return rankings;
    }
}