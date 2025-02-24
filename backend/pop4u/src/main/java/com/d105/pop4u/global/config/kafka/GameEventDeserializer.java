package com.d105.pop4u.global.config.kafka;

import com.d105.pop4u.domain.game.dto.GameEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Deserializer;

public class GameEventDeserializer implements Deserializer<GameEvent> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public GameEvent deserialize(String topic, byte[] data) {
        try {
            return objectMapper.readValue(data, GameEvent.class);
        } catch (Exception e) {
            throw new SerializationException("Error deserializing GameEvent", e);
        }
    }
}