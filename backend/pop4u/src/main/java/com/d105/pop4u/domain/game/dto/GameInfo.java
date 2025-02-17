package com.d105.pop4u.domain.game.dto;

import lombok.Data;

@Data
public class GameInfo {
    private String popupId;
    private GameStatus status;

    public GameInfo(GameStatus status, String popupId) {
        this.status = status;
        this.popupId = popupId;
    }
}