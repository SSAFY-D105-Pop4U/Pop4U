package com.d105.pop4u.domain.search;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PopularSearchService {
    private final RedisTemplate<String, String> redisTemplate;
    private static final String KEY = "popular:searches";

    public void incrementSearchCount(String keyword) {
        redisTemplate.opsForZSet().incrementScore(KEY, keyword, 1);
    }

    public List<String> getTopSearches(int limit) {
        Set<String> topSearches = redisTemplate.opsForZSet().reverseRange(KEY, 0, limit - 1);
        return new ArrayList<>(topSearches);
    }
}
