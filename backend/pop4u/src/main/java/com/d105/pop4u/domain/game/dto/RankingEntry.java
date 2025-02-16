package com.d105.pop4u.domain.game.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RankingEntry {
    private Long userId;
    private LocalDateTime completionTime;
    private int rank;

    public RankingEntry(Long userId, LocalDateTime completionTime) {
        this.userId = userId;
        this.completionTime = completionTime;
    }

    public RankingEntry() {

    }
}