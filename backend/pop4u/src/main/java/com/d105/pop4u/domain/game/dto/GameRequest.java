package com.d105.pop4u.domain.game.dto;

import lombok.Data;

@Data
public class GameRequest {
    private Long userId; // 게임을 시작하는 사용자 ID
    private String storeId; // 팝업스토어 ID
    private String gameStartTime; // 게임 시작 시간 (예: "2025-02-15T14:00:00")
}
