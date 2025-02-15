package com.d105.pop4u.domain.game.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GameStatus {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean isActive;

    public GameStatus(LocalDateTime startTime, LocalDateTime endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.isActive = false; // 초기에는 비활성 상태
    }
}