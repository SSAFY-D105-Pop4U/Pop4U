package com.d105.pop4u.domain.game.consumer;

import com.d105.pop4u.domain.game.dto.GameCompletionEvent;
import com.d105.pop4u.domain.game.service.GameService;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class GameCompletionConsumer {
    @Autowired
    private GameService gameService;

    @KafkaListener(
            topics = "game-completion",
            groupId = "game-completion-group"
    )
    public void handleGameCompletion(ConsumerRecord<String, GameCompletionEvent> record) {
        log.info("Consumer - 메시지 수신: {}", record);
        try {
            GameCompletionEvent event = record.value();
            log.info("Consumer - 게임 완료 이벤트 처리 시작: {}", event);

            gameService.processGameCompletions(Collections.singletonList(event));

            log.info("Consumer - 게임 완료 이벤트 처리 성공");
        } catch (Exception e) {
            log.error("Consumer - 게임 완료 이벤트 처리 실패: ", e);
        }
    }
}