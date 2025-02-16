package com.d105.pop4u.domain.game.controller;

import com.d105.pop4u.domain.game.dto.*;
import com.d105.pop4u.domain.game.service.GameService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/game")
@Slf4j
public class GameController {
    @Autowired
    private KafkaTemplate<String, GameCompletionEvent> kafkaTemplate;
    @Autowired
    private GameService gameService;

    @PostMapping("/start/{popupId}")
    public ResponseEntity<GameInfo> startGame(
            @PathVariable String popupId,
            @RequestParam LocalDateTime startTime) throws JsonProcessingException {
        GameInfo gameInfo = gameService.initializeGame(popupId, startTime);
        return ResponseEntity.ok(gameInfo);
    }

    @GetMapping("/status/{popupId}")
    public ResponseEntity<GameStatus> getGameStatus(@PathVariable String popupId) {
        GameStatus status = gameService.getGameStatus(popupId);
        return ResponseEntity.ok(status);
    }

    @PostMapping("/click/{popupId}")  // userId 파라미터 제거
    public ResponseEntity<ClickResponse> clickGiftBox(
            @PathVariable String popupId,
            @AuthenticationPrincipal UserDetails userDetails) {  // Spring Security로 현재 사용자 정보 가져오기

        if (userDetails == null) {
            return ResponseEntity.badRequest().body(new ClickResponse(false, "로그인이 필요합니다."));
        }

        if (!gameService.isGameActive(popupId)) {
            return ResponseEntity.badRequest().body(new ClickResponse(false, "Game is not active"));
        }

        Long userId = Long.parseLong(userDetails.getUsername());  // 현재 로그인한 사용자의 ID
        GameClickResult result = gameService.processClick(popupId, userId);

        // 게임 완료 시 Kafka로 완료 이벤트 전송
        if (result.isCompleted()) {
            GameCompletionEvent completionEvent = new GameCompletionEvent(
                    popupId,
                    userId,
                    result.getCompletionTime(),
                    result.getTotalClicks()
            );
            kafkaTemplate.send("game-completions", popupId, completionEvent);
        }

        return ResponseEntity.ok(new ClickResponse(
                true,
                result.getCurrentClicks(),
                result.isCompleted()
        ));
    }

    @GetMapping("/rankings/{popupId}")
    public ResponseEntity<List<RankingEntry>> getRankings(@PathVariable String popupId) {
        List<RankingEntry> rankings = gameService.getRankings(popupId);
        return ResponseEntity.ok(rankings);
    }
}