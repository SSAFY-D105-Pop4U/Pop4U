package com.d105.pop4u.domain.game.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class GameService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    // 클릭 수 증가
    public void incrementClick(Long userId) {
        String key = "clicks:" + userId;
        redisTemplate.opsForValue().increment(key, 1);
    }

    // 랭킹 저장
    public void saveRanking(Long userId, int clicks) {
        String key = "rankings";
        redisTemplate.opsForZSet().add(key, String.valueOf(userId), clicks);
    }

    // 랭킹 조회
    public Set<String> getTopRankings(int topN) {
        String key = "rankings";
        return redisTemplate.opsForZSet().reverseRange(key, 0, topN - 1);
    }
}
