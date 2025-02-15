package com.d105.pop4u.domain.game;

import lombok.Data;

@Data
public class Ranking {
    private Long userId; // 사용자 ID
    private int score; // 클릭 수
}
