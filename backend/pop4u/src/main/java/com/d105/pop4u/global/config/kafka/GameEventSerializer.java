package com.d105.pop4u.global.config.kafka;

import com.d105.pop4u.domain.game.GameEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.common.serialization.Serializer;

import java.util.Map;

public class GameEventSerializer implements Serializer<GameEvent> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        // 설정이 필요할 경우 구현
    }

    @Override
    public byte[] serialize(String topic, GameEvent data) {
        try {
            return objectMapper.writeValueAsBytes(data);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing GameEvent", e);
        }
    }

    @Override
    public void close() {
        // 자원 해제 필요 시 구현
    }
}
