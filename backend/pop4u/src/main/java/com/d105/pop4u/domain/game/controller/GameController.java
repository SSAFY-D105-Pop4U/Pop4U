package com.d105.pop4u.domain.game.controller;

import com.d105.pop4u.domain.game.GameEvent;
import com.d105.pop4u.domain.game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    private KafkaTemplate<String, GameEvent> kafkaTemplate;

    @Autowired
    private GameService gameService;

    // 게임 시작 요청
    @PostMapping("/start")
    public ResponseEntity<Void> startGame(@RequestBody GameEvent gameEvent) {
        // Kafka에 게임 시작 이벤트 발행
        kafkaTemplate.send("game-start", gameEvent);
        return ResponseEntity.ok().build();
    }

    // 클릭 이벤트 처리
    @PostMapping("/click/{userId}")
    public ResponseEntity<Void> clickGiftBox(@PathVariable Long userId) {
        gameService.incrementClick(userId);
        return ResponseEntity.ok().build();
    }

    // 랭킹 조회
    @GetMapping("/rankings")
    public ResponseEntity<Set<String>> getRankings() {
        Set<String> rankings = gameService.getTopRankings(5); // 상위 5명 랭킹 조회
        return ResponseEntity.ok(rankings);
    }
}
