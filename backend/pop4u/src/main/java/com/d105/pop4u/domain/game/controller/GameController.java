package com.d105.pop4u.domain.game.controller;

import com.d105.pop4u.domain.game.dto.*;
import com.d105.pop4u.domain.game.service.GameService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    // 1. 게임 생성 + 링크 생성 후 제공
    @PostMapping("/start/{popupId}")
    public ResponseEntity<String> createGameLink(@RequestBody GameStartRequest request) throws JsonProcessingException {

        log.info("Game start request received for popupId: {}, startTime: {}",
                request.getPopupId(), request.getStartTime());  // 로그 추가

        // 게임 초기화 후 링크 생성
        GameInfo gameInfo = gameService.initializeGame(request.getPopupId(), request.getStartTime());
        // 프론트엔드 게임 페이지 URL 생성
        String gameLink = "/Event_Game/" + gameInfo.getPopupId();

        log.info("Game initialized with link: {}", gameLink);  // 로그 추가
        return ResponseEntity.ok(gameLink);
    }

    // 2. 게임 시작 전 카운트다운을 위한 상태 확인
    @GetMapping("/status/{popupId}")
    public ResponseEntity<GameStatus> getGameStatus(@PathVariable String popupId) {
        GameStatus status = gameService.getGameStatus(popupId);
        return ResponseEntity.ok(status);
    }

    // 3. 게임 완료 처리 (10번 클릭 완료한 경우에만 호출)
    @PostMapping("/complete")
    public ResponseEntity<ClickResponse> completeGame(
            @RequestBody GameCompletionEvent completionEvent) {
//      // Kafka로 전송
//        kafkaTemplate.send("game-completions", completionEvent);
        // 여기서 popupId를 두 번째 파라미터로 전달해야 하는데 누락됨
//        kafkaTemplate.send("game-completions", completionEvent);  // 문제 지점
        // 올바른 방식:
//         kafkaTemplate.send("game-completions", completionEvent.getPopupId(), completionEvent);

        try {
<<<<<<< HEAD
            log.info("Received game completion request for popupId: {}, userId: {}",
                    completionEvent.getPopupId(), completionEvent.getUserId());

            // Kafka로 전송
            kafkaTemplate.send("game-completion",   // "game-completions" 대신 "game-completion" 사용
                    completionEvent.getPopupId(),
                    completionEvent).get();  // 전송 완료 대기
=======
            // 받은 데이터 로깅
            log.info("Received game completion request - popupId: {}, userId: {}, completionTime: {}",
                    completionEvent.getPopupId(),
                    completionEvent.getUserId(),
                    completionEvent.getCompletionTime());

            // Kafka 전송
            kafkaTemplate.send("game-completion",
                    completionEvent.getPopupId(),
                    completionEvent).get();
            log.info("Successfully sent to Kafka topic game-completion");
>>>>>>> feat/BE/kafka

            log.info("Successfully sent to Kafka");
            return ResponseEntity.ok(new ClickResponse(true, "Game completed successfully", true));
        } catch (Exception e) {
            log.error("Failed to send to Kafka: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ClickResponse(false, e.getMessage(), false));
        }
    }

    // 4. 게임 종료 후 랭킹 조회
    @GetMapping("/rankings/{popupId}")
    public ResponseEntity<List<RankingEntry>> getRankings(@PathVariable String popupId) {
        try {
            List<RankingEntry> rankings = gameService.getRankings(popupId);
            if (rankings.isEmpty()) {
                log.info("No rankings found for popupId: {}", popupId);
                return ResponseEntity.ok(new ArrayList<>());  // 빈 리스트 반환
            }
            return ResponseEntity.ok(rankings);
        } catch (Exception e) {
            log.error("Error getting rankings for popupId {}: ", popupId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}