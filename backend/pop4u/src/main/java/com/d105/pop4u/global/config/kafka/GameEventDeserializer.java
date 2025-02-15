package com.d105.pop4u.global.config.kafka;

import com.d105.pop4u.domain.game.GameEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.common.serialization.Deserializer;

import java.util.Map;

public class GameEventDeserializer implements Deserializer<GameEvent> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        // 설정이 필요할 경우 구현
    }

    @Override
    public GameEvent deserialize(String topic, byte[] data) {
        try {
            return objectMapper.readValue(data, GameEvent.class);
        } catch (Exception e) {
            throw new RuntimeException("Error deserializing GameEvent", e);
        }
    }

    @Override
    public void close() {
        // 자원 해제 필요 시 구현
    }
}
