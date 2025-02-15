package com.d105.pop4u.domain.game;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ClickEvent {
    private String popupId;
    private Long userId;
    private LocalDateTime clickTime;
    private int clickCount;
}
