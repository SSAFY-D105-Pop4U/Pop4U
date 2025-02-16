package com.d105.pop4u.domain.game.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GameStartRequest {
    private String popupId;
    private LocalDateTime startTime;
}
