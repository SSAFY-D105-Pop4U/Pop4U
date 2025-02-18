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
        try {
            log.info("Consumer received messages - count: {}", records.size());

            // 각 레코드 내용 출력
            records.forEach(record -> {
                log.info("Consumer received message - Key: {}, Value: {}",
                        record.key(), record.value());
            });

            List<GameCompletionEvent> completions = records.stream()
                    .map(ConsumerRecord::value)
                    .collect(Collectors.toList());

            gameService.processGameCompletions(completions);
            log.info("Consumer finished processing messages");
        } catch (Exception e) {
            log.error("Consumer error processing messages: ", e);
            e.printStackTrace();  // 스택 트레이스 출력
        }
    }
}