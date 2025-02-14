package com.d105.game.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Entity
@Data
public class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId; // 사용자 ID
    private int score; // 클릭 수

    // 추가적인 필드 (예: 프리패스권 등) 필요 시 여기에 추가
}
