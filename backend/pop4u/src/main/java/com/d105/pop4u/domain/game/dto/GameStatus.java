package com.d105.pop4u.domain.game.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GameStatus {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean isActive;
    private long remainingSeconds;  // 추가: 시작까지 또는 종료까지 남은 시간

    public GameStatus(LocalDateTime startTime, LocalDateTime endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.isActive = false; // 초기에는 비활성 상태
        // 시작 전이면 시작까지 남은 시간, 시작 후면 종료까지 남은 시간 계산
        this.remainingSeconds = calculateRemainingSeconds();
    }

    private long calculateRemainingSeconds() {
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(startTime)) {
            return java.time.Duration.between(now, startTime).getSeconds();
        } else if (now.isBefore(endTime)) {
            return java.time.Duration.between(now, endTime).getSeconds();
        }
        return 0;
    }
}