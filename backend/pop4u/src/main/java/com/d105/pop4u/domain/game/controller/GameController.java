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
        try {
            log.info("게임 완료 요청 받음 - popupId: {}, userId: {}, completionTime: {}",
                    completionEvent.getPopupId(),
                    completionEvent.getUserId(),
                    completionEvent.getCompletionTime());

            // Kafka로 비동기 전송
            kafkaTemplate.send("game-completion",
                            completionEvent.getPopupId(),
                            completionEvent)
                    .getClass(
                            success -> log.info("Kafka 메시지 전송 성공: {}", success.getRecordMetadata()),
                            failure -> log.error("Kafka 메시지 전송 실패: ", failure)
                    );

            return ResponseEntity.ok(new ClickResponse(true, "Game completed successfully", true));
        } catch (Exception e) {
            log.error("게임 완료 처리 실패: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ClickResponse(false, "메시지 전송 실패: " + e.getMessage(), false));
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