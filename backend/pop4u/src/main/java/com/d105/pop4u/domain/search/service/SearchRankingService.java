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
@EnableScheduling
public class SearchRankingService {
    private final RedisTemplate<String, String> redisTemplate;
    // 현재 집계 중인 시간대의 검색어 카운트
    private static final String CURRENT_COUNT_KEY = "search:count:current";
    // 현재 표시 중인 순위 (이전 시간대의 결과)
    private static final String CURRENT_RANKING_KEY = "search:ranking:current";
    // 이전 시간대의 순위 (순위 변동 비교용)
    private static final String PREVIOUS_RANKING_KEY = "search:ranking:previous";
    private static final String LAST_UPDATE_TIME_KEY = "search:lastUpdateTime";
    private static final long RANKING_SIZE = 10;

    // 검색어 카운트 증가 (현재 집계 중인 시간대에 추가)
    public void incrementSearchCount(String keyword) {
        redisTemplate.opsForZSet().incrementScore(CURRENT_COUNT_KEY, keyword, 1);
    }

    // 매시 정각에 실행
    @Scheduled(cron = "0 0 * * * *")
    public void updateRankings() {
        // 1. 이전 순위를 저장
        redisTemplate.delete(PREVIOUS_RANKING_KEY);
        redisTemplate.opsForZSet().unionAndStore(CURRENT_RANKING_KEY, Collections.emptySet(), PREVIOUS_RANKING_KEY);

        // 2. 현재 집계된 카운트를 순위로 변환
        redisTemplate.delete(CURRENT_RANKING_KEY);
        redisTemplate.opsForZSet().unionAndStore(CURRENT_COUNT_KEY, Collections.emptySet(), CURRENT_RANKING_KEY);

        // 3. 이전 시간대 TOP 10 키워드들을 count 1로 새로운 집계에 추가
        Set<ZSetOperations.TypedTuple<String>> top10 =
                redisTemplate.opsForZSet().reverseRangeWithScores(CURRENT_RANKING_KEY, 0, RANKING_SIZE - 1);

        // 4. 새로운 집계 시작을 위해 카운트 초기화
        redisTemplate.delete(CURRENT_COUNT_KEY);

        // 5. TOP 10 키워드들을 count 1로 새 집계에 추가
        for (ZSetOperations.TypedTuple<String> tuple : top10) {
            redisTemplate.opsForZSet().add(CURRENT_COUNT_KEY, tuple.getValue(), 1.0);
        }

        // 6. 시간 업데이트
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        redisTemplate.opsForValue().set(LAST_UPDATE_TIME_KEY,
                now.format(DateTimeFormatter.ofPattern("MM.dd HH:mm 기준")));
    }

    public List<SearchRankDTO> getTopSearches() {
        // 현재 표시 중인 순위 조회 (이전 시간대의 결과)
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
                    .build());

            currentRank++;
        }

        return rankings;
    }

    private String calculateStatus(int currentRank, Integer previousRank) {
        if (previousRank == null) return "up";  // 새로운 검색어는 상승으로 표시
        if (currentRank == previousRank) return "neutral";
        if (currentRank < previousRank) return "up";
        return "down";
    }
}
