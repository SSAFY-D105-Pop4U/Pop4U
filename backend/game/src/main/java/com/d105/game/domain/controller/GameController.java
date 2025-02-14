package com.d105.game.controller;


import com.d105.game.domain.GameEvent;
import com.d105.game.domain.GameSession;
import com.d105.game.domain.Ranking;
import com.d105.game.domain.service.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    private KafkaTemplate<String, GameEvent> kafkaTemplate;

    @Autowired
    private RankingService rankingService; // RankingService 주입

    // 게임 시작 API
    @PostMapping("/start")
    public ResponseEntity<GameSession> startGame(@RequestBody ClickRequest gameRequest) {
        // 게임 세션 생성
        GameSession gameSession = new GameSession();
        gameSession.setStartTime(LocalDateTime.now());

        // Kafka에 게임 시작 이벤트 발행
        GameEvent event = new GameEvent();
        event.setEventType("START");
        kafkaTemplate.send("game-events", event);

        return ResponseEntity.ok(gameSession);
    }

    // 클릭 API
    @PostMapping("/click")
    public ResponseEntity<Void> clickGiftBox(@RequestBody ClickRequest clickRequest) {
        GameEvent event = new GameEvent();
        event.setUserId(clickRequest.getUserId());
        event.setClickCount(1); // 클릭 수 1 증가
        event.setEventType("CLICK");

        kafkaTemplate.send("game-events", event);
        return ResponseEntity.ok().build();
    }

    // 게임 종료 API
    @PostMapping("/end")
    public ResponseEntity<List<Ranking>> endGame() {
        GameEvent event = new GameEvent();
        event.setEventType("END");
        kafkaTemplate.send("game-events", event);

        // 랭킹 계산 로직
        List<Ranking> rankings = rankingService.calculateRankings();
        return ResponseEntity.ok(rankings);
    }
}
