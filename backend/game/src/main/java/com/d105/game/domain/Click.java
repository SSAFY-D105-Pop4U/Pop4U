package com.d105.game.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Click {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId; // 사용자 ID
    private int count; // 클릭 수

    // 필요에 따라 관계 설정 및 메서드를 추가할 수 있습니다.
}
