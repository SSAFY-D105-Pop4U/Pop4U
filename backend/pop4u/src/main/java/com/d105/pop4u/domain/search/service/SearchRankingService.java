package com.d105.pop4u.domain.search.service;

import com.d105.pop4u.domain.search.dto.SearchRankDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchRankingService {
    private final RedisTemplate<String, String> redisTemplate;
    private static final String CURRENT_RANKING_KEY = "search:ranking:current";  // 현재 순위
    private static final String PREVIOUS_RANKING_KEY = "search:ranking:previous";  // 이전 순위
    private static final String LAST_UPDATE_TIME_KEY = "search:lastUpdateTime";  // 마지막 업데이트 시간
    private static final long RANKING_SIZE = 10;

    public void incrementSearchCount(String keyword) {
        redisTemplate.opsForZSet().incrementScore(CURRENT_RANKING_KEY, keyword, 1);
    }

    // 순위 정보 업데이트 (매 시간 또는 매일 실행)
    @Scheduled(cron = "0 0 * * * *")  // 매시간 실행
    public void updateRankings() {
        // 이전 순위 데이터 저장
        redisTemplate.delete(PREVIOUS_RANKING_KEY);
        redisTemplate.opsForZSet().unionAndStore(CURRENT_RANKING_KEY, Collections.emptySet(), PREVIOUS_RANKING_KEY);

        // 현재 시간 저장 (한국 시간)
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        redisTemplate.opsForValue().set(LAST_UPDATE_TIME_KEY,
                now.format(DateTimeFormatter.ofPattern("MM.dd HH:mm 기준")));
    }

    public List<SearchRankDTO> getTopSearches() {
        // 현재 순위 조회
        Set<ZSetOperations.TypedTuple<String>> currentRankings =
                redisTemplate.opsForZSet().reverseRangeWithScores(CURRENT_RANKING_KEY, 0, RANKING_SIZE - 1);

        // 이전 순위 맵 생성
        Map<String, Integer> prevRankMap = new HashMap<>();
        Set<ZSetOperations.TypedTuple<String>> prevRankings =
                redisTemplate.opsForZSet().reverseRangeWithScores(PREVIOUS_RANKING_KEY, 0, -1);
        int prevRank = 1;
        for (ZSetOperations.TypedTuple<String> tuple : prevRankings) {
            prevRankMap.put(tuple.getValue(), prevRank++);
        }

        // 결과 생성
        List<SearchRankDTO> rankings = new ArrayList<>();
        int currentRank = 1;

        for (ZSetOperations.TypedTuple<String> tuple : currentRankings) {
            String keyword = tuple.getValue();
            Integer previousRank = prevRankMap.get(keyword);

            String status = calculateStatus(currentRank, previousRank);

            rankings.add(SearchRankDTO.builder()
                    .rank(currentRank)
                    .keyword(keyword)
                    .count(tuple.getScore().longValue())
                    .status(status)
                    .prevRank(previousRank)
                    .build());

            currentRank++;
        }

        return rankings;
    }

    private String calculateStatus(int currentRank, Integer previousRank) {
        if (previousRank == null) return "up";
        if (currentRank == previousRank) return "neutral";
        if (currentRank < previousRank) return "up";
        return "down";
    }

    public String getLastUpdateTime() {
        return redisTemplate.opsForValue().get(LAST_UPDATE_TIME_KEY);
    }
}
