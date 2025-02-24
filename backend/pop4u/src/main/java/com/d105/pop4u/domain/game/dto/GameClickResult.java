package com.d105.pop4u.domain.game.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GameClickResult {
    private int currentClicks;
    private boolean completed;
    private LocalDateTime completionTime;
    private int totalClicks;  // 추가

    public GameClickResult(int currentClicks, boolean completed, LocalDateTime completionTime) {
        this.currentClicks = currentClicks;
        this.completed = completed;
        this.completionTime = completionTime;
        this.totalClicks = currentClicks;  // totalClicks는 currentClicks와 동일
    }
}