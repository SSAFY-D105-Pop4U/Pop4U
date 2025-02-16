package com.d105.pop4u.domain.game.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RankingEntry {
    private Long userId;
    private String nickname;  // 추가: 사용자 닉네임 표시
    private LocalDateTime completionTime;
    private int rank;
    private long completionTimeMillis;  // 추가: 게임 완료까지 걸린 시간

    public RankingEntry(Long userId, LocalDateTime completionTime) {
        this.userId = userId;
        this.completionTime = completionTime;
    }

    public RankingEntry() {

    }
}