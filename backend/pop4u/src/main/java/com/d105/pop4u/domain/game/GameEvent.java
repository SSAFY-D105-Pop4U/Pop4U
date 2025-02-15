package com.d105.pop4u.domain.game;

import lombok.Data;

@Data
public class GameEvent {
    private Long userId; // 사용자 ID
    private String popupId; // 팝업스토어 ID
    private String gameStartTime; // 게임 시작 시간
}
