package com.d105.pop4u.domain.game.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class GameCreateProducer {

    private final KafkaTemplate<String, Long> kafkaTemplate;

    public GameCreateProducer(KafkaTemplate<String, Long> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void create(Long userId) {
        kafkaTemplate.send("game_create", userId);
    }
}
