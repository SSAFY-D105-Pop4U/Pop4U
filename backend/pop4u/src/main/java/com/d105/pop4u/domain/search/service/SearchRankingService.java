package com.d105.pop4u.domain.search.service;

import com.d105.pop4u.domain.search.dto.SearchRankDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@EnableScheduling  // 스케줄링 활성화
public class SearchRankingService {
    private final RedisTemplate<String, String> redisTemplate;
    private static final String CURRENT_RANKING_KEY = "search:ranking:current";
    private static final String PREVIOUS_RANKING_KEY = "search:ranking:previous";
    private static final String LAST_UPDATE_TIME_KEY = "search:lastUpdateTime";
    private static final long RANKING_SIZE = 10;

    // 검색어 카운트 증가 시 바로 시간도 업데이트
    public void incrementSearchCount(String keyword) {
        redisTemplate.opsForZSet().incrementScore(CURRENT_RANKING_KEY, keyword, 1);
        updateLastUpdateTime();  // 검색할 때마다 시간 업데이트
    }

    // 시간 업데이트 메서드 분리
    private void updateLastUpdateTime() {
        redisTemplate.opsForValue().set(LAST_UPDATE_TIME_KEY,
                LocalDateTime.now(ZoneId.of("Asia/Seoul"))
                        .format(DateTimeFormatter.ofPattern("MM.dd HH:mm 기준")));
    }

    @Scheduled(cron = "0 0 * * * *")  // 매시간 실행
    public void updateRankings() {
        redisTemplate.delete(PREVIOUS_RANKING_KEY);
        redisTemplate.opsForZSet().unionAndStore(CURRENT_RANKING_KEY, Collections.emptySet(), PREVIOUS_RANKING_KEY);
        updateLastUpdateTime();
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
