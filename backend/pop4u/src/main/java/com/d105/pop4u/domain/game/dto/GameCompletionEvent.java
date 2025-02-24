package com.d105.pop4u.domain.game.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GameCompletionEvent {
    private String popupId;
    private Long userId;
    private LocalDateTime completionTime;

    // 기본 생성자 추가
    public GameCompletionEvent() {
    }

    public GameCompletionEvent(String popupId, Long userId,
                               LocalDateTime completionTime) {
        this.popupId = popupId;
        this.userId = userId;
        this.completionTime = completionTime;
    }
}