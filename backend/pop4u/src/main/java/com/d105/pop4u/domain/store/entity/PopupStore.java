package com.d105.pop4u.domain.store.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Table(name = "popup_store")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PopupStore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // BIGINT 타입 자동 증가
    @Column(name = "popup_id", nullable = false)
    private Long popupId;

    // 유저 ID를 직접 저장하는 방식으로 변경 (User 엔티티 연결 X)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    // 유저 연결 시 아래 코드

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "user_id", nullable = false) // 브랜드 유저와 연결
    // private User user;

    @Column(name = "popup_name", length = 50, nullable = false)
    private String popupName;

    @Column(name = "popup_region", length = 50, nullable = false)
    private String popupRegion;

    @Column(name = "popup_address", nullable = false)
    private String popupAddress;

    @Column(name = "popup_start_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date popupStartDate;

    @Column(name = "popup_end_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date popupEndDate;

    @Column(name = "popup_open_time", nullable = false)
    private LocalTime popupOpenTime;

    @Column(name = "popup_closed_time", nullable = false)
    private LocalTime popupClosedTime;

    @Lob
    @Column(name = "popup_description")
    private String popupDescription;

    @Builder.Default
    @Column(name = "popup_view_count", nullable = false)
    private Long popupViewCount = 0L; // 기본값 0

    @Column(name = "popup_url")
    private String popupUrl;

    @Builder.Default
    @Column(name = "popup_maximum_capacity", nullable = false)
    private Integer popupMaximumCapacity = 1;

    @Builder.Default
    @Column(name = "popup_maximum_people", nullable = false)
    private Integer popupMaximumPeople = 1;

    @Builder.Default
    @Column(name = "popup_created_at", nullable = false, updatable = false)
    private LocalDateTime popupCreatedAt = LocalDateTime.now();

    @Builder.Default
    @Column(name = "popup_updated_at", nullable = false)
    private LocalDateTime popupUpdatedAt = LocalDateTime.now();

}
