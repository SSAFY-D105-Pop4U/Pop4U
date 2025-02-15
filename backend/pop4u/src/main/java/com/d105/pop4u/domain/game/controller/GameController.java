package com.d105.pop4u.domain.game.controller;


import com.d105.pop4u.domain.game.entity.GameEvent;
import com.d105.pop4u.domain.game.dto.GameRequest;
import com.d105.pop4u.domain.game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    private KafkaTemplate<String, GameEvent> kafkaTemplate;

    @Autowired
    private GameService gameService;

    // 게임 시작 요청
    @PostMapping("/start")
    public ResponseEntity<Void> startGame(@RequestBody GameRequest gameRequest) {
        // Kafka에 게임 시작 이벤트 발행
        GameEvent event = new GameEvent();
        event.setStoreId(gameRequest.getStoreId());
        event.setUserId(gameRequest.getUserId());
        event.setGameStartTime(gameRequest.getGameStartTime());
        kafkaTemplate.send("game-start", event);

        return ResponseEntity.ok().build();
    }
}
