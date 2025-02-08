package com.d105.pop4u.domain.notification.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id", nullable = false)
    private Long notificationId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "popup_id")  // nullable
    private Long popupId;

    @Column(name = "notification_title", length = 50, nullable = false)
    private String notificationTitle;

    @Column(name = "notification_content", length = 255, nullable = false)
    private String notificationContent;

    @Column(name = "notification_read", nullable = false)
    private Boolean notificationRead;

    @Column(name = "notification_created_at", nullable = false)
    private LocalDateTime notificationCreatedAt;

    // 알림 생성 시 자동으로 현재 시간 설정
    @PrePersist
    public void prePersist() {
        this.notificationCreatedAt = LocalDateTime.now();
        this.notificationRead = false;  // 기본값 false로 설정
    }
}
