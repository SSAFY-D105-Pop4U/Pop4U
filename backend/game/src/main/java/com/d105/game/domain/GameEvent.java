package com.d105.game.domain;

import lombok.Data;

@Data
public class GameEvent {
    private Long userId; // 사용자 ID
    private int clickCount; // 클릭 수
    private String eventType; // 이벤트 타입 (예: "CLICK", "START", "END")

    // 필요에 따라 기본 생성자 및 기타 메서드를 추가할 수 있습니다.
}
