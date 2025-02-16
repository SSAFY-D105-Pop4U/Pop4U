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
@CrossOrigin(origins = "*")   // CORS 설정
@Slf4j
public class GameController {
    @Autowired
    private KafkaTemplate<String, GameCompletionEvent> kafkaTemplate;
    @Autowired
    private GameService gameService;

    // 1. 브랜드 회원이 게임 생성
    @PostMapping("/start")
    public ResponseEntity<GameInfo> startGame(@RequestBody GameStartRequest request) throws JsonProcessingException {
        GameInfo gameInfo = gameService.initializeGame(request.getPopupId(), request.getStartTime());
        return ResponseEntity.ok(gameInfo);
    }

    // 링크 생성
    @PostMapping("/create-link/{popupId}")
    public ResponseEntity<String> createGameLink(
            @PathVariable String popupId,
            @RequestParam LocalDateTime startTime) throws JsonProcessingException {
        // 게임 초기화 후 링크 생성
        GameInfo gameInfo = gameService.initializeGame(popupId, startTime);
        // 프론트엔드 게임 페이지 URL 생성
        String gameLink = "/game/" + popupId;
        return ResponseEntity.ok(gameLink);
    }

    // 4. 게임 시작 전 카운트다운을 위한 상태 확인
    @GetMapping("/status/{popupId}")
    public ResponseEntity<GameStatus> getGameStatus(@PathVariable String popupId) {
        GameStatus status = gameService.getGameStatus(popupId);
        return ResponseEntity.ok(status);
    }

    // 6. 게임 완료 처리 (10번 클릭 완료한 경우에만 호출)
    @PostMapping("/complete/{popupId}")
    public ResponseEntity<ClickResponse> completeGame(
            @PathVariable String popupId,
            @AuthenticationPrincipal UserDetails userDetails) {

//        if (userDetails == null) {
//            return ResponseEntity.badRequest().body(new ClickResponse(false, "로그인이 필요합니다."));
//        }
//
//        if (!gameService.isGameActive(popupId)) {
//            return ResponseEntity.badRequest().body(new ClickResponse(false, "Game is not active"));
//        }

        Long userId = Long.parseLong(userDetails.getUsername());

        // 완료 이벤트 Kafka로 전송
        GameCompletionEvent completionEvent = new GameCompletionEvent(
                popupId,
                userId,
                LocalDateTime.now(),
                10  // 완료된 경우에만 호출되므로 10
        );
        kafkaTemplate.send("game-completions", popupId, completionEvent);

        return ResponseEntity.ok(new ClickResponse(true, "Game completed successfully", true));
    }

    // 7. 게임 종료 후 랭킹 조회
    @GetMapping("/rankings/{popupId}")
    public ResponseEntity<List<RankingEntry>> getRankings(@PathVariable String popupId) {
        List<RankingEntry> rankings = gameService.getRankings(popupId);
        return ResponseEntity.ok(rankings);
    }
}