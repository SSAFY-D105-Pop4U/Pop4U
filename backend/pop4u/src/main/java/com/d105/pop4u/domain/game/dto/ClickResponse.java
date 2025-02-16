package com.d105.pop4u.domain.game.dto;

import lombok.Data;

@Data
public class ClickResponse {
    private boolean success;
    private String message;
    private int currentClicks;
    private boolean completed;

    // 기존 생성자
    public ClickResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // 기존 생성자
    public ClickResponse(boolean success, int currentClicks, boolean completed) {
        this.success = success;
        this.currentClicks = currentClicks;
        this.completed = completed;
    }

    // 새로운 생성자 추가
    public ClickResponse(boolean success, String message, boolean completed) {
        this.success = success;
        this.message = message;
        this.completed = completed;
    }
}
