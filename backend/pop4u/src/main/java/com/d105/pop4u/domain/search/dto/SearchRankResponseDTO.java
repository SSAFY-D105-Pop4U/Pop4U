package com.d105.pop4u.domain.search.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SearchRankResponseDTO {
    private String updateTime;          // "02.14 13:00 기준"
    private List<SearchRankDTO> rankings;  // 순위 목록
}
