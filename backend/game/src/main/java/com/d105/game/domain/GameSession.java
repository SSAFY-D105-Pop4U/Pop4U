package com.d105.game.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime startTime; // 게임 시작 시간
    private LocalDateTime endTime; // 게임 종료 시간

    // 추가적인 필드 및 관계 설정이 필요한 경우 여기에 추가
}
