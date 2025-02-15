package com.d105.pop4u.domain.game.service;

import com.d105.pop4u.domain.game.entity.GameEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "game-start", groupId = "game-group")
    public void listen(GameEvent event) {
        // 게임 시작 로직 구현
        // 설정한 시간이 되면 게임 시작
    }
}
