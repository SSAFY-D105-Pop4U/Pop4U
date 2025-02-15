package com.d105.pop4u.domain.game;

import lombok.Data;

@Data
public class Click {
    private Long userId; // 사용자 ID
    private int clickCount; // 클릭 수
}
