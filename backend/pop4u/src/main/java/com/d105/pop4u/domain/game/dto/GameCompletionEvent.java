package com.d105.pop4u.domain.game.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GameCompletionEvent {
    private String popupId;
    private Long userId;
    private LocalDateTime completionTime;
    private int totalClicks;

    public GameCompletionEvent(String popupId, Long userId,
                               LocalDateTime completionTime, int totalClicks) {
        this.popupId = popupId;
        this.userId = userId;
        this.completionTime = completionTime;
        this.totalClicks = totalClicks;
    }
}