package com.d105.pop4u.domain.notification.entity;

import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id", nullable = false)
    private Long notificationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "popup_id", nullable = false)
    private PopupStore popupStore;

    @Column(name = "notification_title", length = 50, nullable = false)
    private String notificationTitle;

    @Column(name = "notification_content", length = 255, nullable = false)
    private String notificationContent;

    @Column(name = "notification_read", nullable = false, columnDefinition = "TINYINT DEFAULT 0")
    private Boolean notificationRead;

    @Column(name = "notification_created_at", nullable = false, columnDefinition = "DATETIME DEFAULT NOW()")
    private LocalDateTime notificationCreatedAt;

    @PrePersist
    public void prePersist() {
        this.notificationRead = false;
        this.notificationCreatedAt = LocalDateTime.now();
    }

    // 읽음 상태 변경을 위한 메서드
    public void markAsRead() {
        this.notificationRead = true;
    }
}