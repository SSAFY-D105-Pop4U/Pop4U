package com.d105.pop4u.domain.game.consumer;

import com.d105.pop4u.domain.game.dto.GameCompletionEvent;
import com.d105.pop4u.domain.game.service.GameService;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class GameCompletionConsumer {
    @Autowired
    private GameService gameService;

    @KafkaListener(
            topics = "game-completions",
            groupId = "game-completion-group",
            containerFactory = "gameCompletionListenerContainerFactory"
    )
    public void handleGameCompletion(List<ConsumerRecord<String, GameCompletionEvent>> records) {
        log.info("Received {} game completion events", records.size());

        List<GameCompletionEvent> completions = records.stream()
                .map(ConsumerRecord::value)
                .collect(Collectors.toList());

        // 배치로 처리
        gameService.processGameCompletions(completions);

        log.info("Processed {} game completion events", completions.size());
    }
}