package com.d105.pop4u.domain.game.entity;

import lombok.Data;

@Data
public class GameEvent {
    private Long userId; // 사용자 ID
    private String storeId; // 팝업스토어 ID
    private String gameStartTime; // 게임 시작 시간
}
