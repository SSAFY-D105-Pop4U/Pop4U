package com.d105.game.service;

import com.d105.game.domain.GameEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "game-events", groupId = "game-group")
    public void listen(GameEvent event) {
        if ("CLICK".equals(event.getEventType())) {
            // 클릭 수를 데이터베이스에 업데이트하거나 메모리에서 집계
            // 클릭 수 집계 로직 구현
        } else if ("END".equals(event.getEventType())) {
            // 게임 종료 처리 로직 구현
        }
    }
}
