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
    public void handleGameCompletion(List<ConsumerRecord<String, GameCompletionEvent>> records) {
        log.info("Raw Kafka messages received: {}", records.size());
        try {
            List<GameCompletionEvent> events = records.stream()
                    .map(ConsumerRecord::value)
                    .collect(Collectors.toList());
            gameService.processGameCompletions(events);
            log.info("Successfully processed game completion events");
        } catch (Exception e) {
            log.error("Error processing game completions: ", e);
        }
    }
}