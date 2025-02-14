package com.d105.pop4u.domain.search.service;

import com.d105.pop4u.domain.search.dto.SearchRankDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SearchRankingService {
    private final RedisTemplate<String, String> redisTemplate;
    private static final String SEARCH_RANKING_KEY = "search:ranking";
    private static final long RANKING_SIZE = 10; // 상위 10개 유지

    // 검색어 카운트 증가
    public void incrementSearchCount(String keyword) {
        redisTemplate.opsForZSet().incrementScore(SEARCH_RANKING_KEY, keyword, 1);
    }

    // 인기 검색어 상위 10개 조회
    public List<SearchRankDTO> getTopSearches() {
        Set<ZSetOperations.TypedTuple<String>> typedTuples =
                redisTemplate.opsForZSet().reverseRangeWithScores(SEARCH_RANKING_KEY, 0, RANKING_SIZE - 1);

        List<SearchRankDTO> rankings = new ArrayList<>();
        int rank = 1;

        if (typedTuples != null) {
            for (ZSetOperations.TypedTuple<String> tuple : typedTuples) {
                rankings.add(SearchRankDTO.builder()
                        .rank(rank++)
                        .keyword(tuple.getValue())
                        .count(tuple.getScore().longValue())
                        .build());
            }
        }

        return rankings;
    }
}
