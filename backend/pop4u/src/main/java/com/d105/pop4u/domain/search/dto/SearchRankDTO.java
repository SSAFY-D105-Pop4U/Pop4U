package com.d105.pop4u.domain.search.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SearchRankDTO {
    private int rank;        // 순위
    private String keyword;  // 검색어
    private long count;      // 검색 횟수
}
