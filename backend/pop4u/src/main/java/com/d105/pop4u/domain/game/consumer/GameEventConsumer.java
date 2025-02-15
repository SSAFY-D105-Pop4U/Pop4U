package com.d105.pop4u.domain.game.consumer;

import com.d105.pop4u.domain.game.GameEvent;
import com.d105.pop4u.domain.game.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Component
public class GameEventConsumer {

    private final GameService gameService;

    public GameEventConsumer(GameService gameService) {
        this.gameService = gameService;
    }

    @KafkaListener(topics = "game-start", groupId = "game-group")
    public void handleGameStart(GameEvent gameEvent) {
        gameService.initializeGame(gameEvent);
    }

    @KafkaListener(topics = "game_create", groupId = "game-group")
    public void handleGameCreate(Long userId) {
        gameService.createGame(userId);
    }

    @GetMapping("/score/{userId}")
    public ResponseEntity<Long> getCurrentScore(@PathVariable Long userId) {
        Long score = gameService.getCurrentScore(userId);
        return ResponseEntity.ok(score);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleIllegalState(IllegalStateException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

}