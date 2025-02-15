package com.d105.pop4u.domain.game.service;

import com.d105.pop4u.domain.game.GameEvent;
import com.d105.pop4u.domain.game.producer.GameCreateProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
public class GameService {

    private static final String GAME_SESSION_PREFIX = "game:session:";
    private static final String CLICK_COUNT_PREFIX = "game:clicks:";
    private static final String RANKINGS_KEY = "game:rankings";
    private static final int GAME_DURATION_SECONDS = 10;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private final GameCreateProducer gameCreateProducer;

    public GameService(GameCreateProducer gameCreateProducer) {
        this.gameCreateProducer = gameCreateProducer;
    }

    public void initializeGame(GameEvent gameEvent) {
        String sessionKey = GAME_SESSION_PREFIX + gameEvent.getUserId();
        String clickKey = CLICK_COUNT_PREFIX + gameEvent.getUserId();

        // 게임 세션 초기화
        redisTemplate.opsForValue().set(sessionKey, gameEvent.getGameStartTime());
        redisTemplate.opsForValue().set(clickKey, "0");

        // 게임 세션 만료 설정 (10초)
        redisTemplate.expire(sessionKey, GAME_DURATION_SECONDS, TimeUnit.SECONDS);
        redisTemplate.expire(clickKey, GAME_DURATION_SECONDS, TimeUnit.SECONDS);
    }

    public void createGame(Long userId) {
        // 게임 생성 로직
        String sessionKey = GAME_SESSION_PREFIX + userId;
        if (!Boolean.TRUE.equals(redisTemplate.hasKey(sessionKey))) {
            throw new IllegalStateException("Game session not found");
        }
    }

    public void incrementClick(Long userId) {
        String sessionKey = GAME_SESSION_PREFIX + userId;
        String clickKey = CLICK_COUNT_PREFIX + userId;

        // 게임 세션 확인
        if (!Boolean.TRUE.equals(redisTemplate.hasKey(sessionKey))) {
            throw new IllegalStateException("Game session not found or expired");
        }

        // 클릭 수 증가 (atomic operation)
        Long clicks = redisTemplate.opsForValue().increment(clickKey);

        // 랭킹 업데이트
        if (clicks != null) {
            redisTemplate.opsForZSet().add(RANKINGS_KEY, userId.toString(), clicks);
        }
    }

    public Set<String> getTopRankings(int topN) {
        return redisTemplate.opsForZSet().reverseRange(RANKINGS_KEY, 0, topN - 1);
    }

    public Long getCurrentScore(Long userId) {
        String clickKey = CLICK_COUNT_PREFIX + userId;
        String score = redisTemplate.opsForValue().get(clickKey);
        return score != null ? Long.parseLong(score) : 0L;
    }
}