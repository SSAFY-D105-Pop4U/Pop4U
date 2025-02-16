package com.d105.pop4u.domain.game.dto;

import lombok.Data;

@Data
public class ClickResponse {
    private boolean success;
    private String message;
    private int currentClicks;
    private boolean completed;

    public ClickResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ClickResponse(boolean success, int currentClicks, boolean completed) {
        this.success = success;
        this.currentClicks = currentClicks;
        this.completed = completed;
    }
}