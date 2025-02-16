package com.d105.pop4u.domain.search.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SearchRankDTO {
    private int rank;        // 현재 순위
    private String keyword;  // 검색어
    private long count;      // 검색 횟수
    private String status;   // 순위 변동 상태 ("up", "down", "neutral")
    private Integer prevRank;  // 이전 순위 (없으면 null)
}
