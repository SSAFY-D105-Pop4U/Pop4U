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
        log.info("Raw Kafka message received: {}", record);
        try {
            GameCompletionEvent event = record.value();
            gameService.processGameCompletions(Collections.singletonList(event));
            log.info("Successfully processed game completion event");
        } catch (Exception e) {
            log.error("Error processing game completion: ", e);
        }
    }
}