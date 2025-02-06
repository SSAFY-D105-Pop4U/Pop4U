package com.d105.pop4u.domain.reservation.entity;

import com.d105.pop4u.domain.store.entity.PopupStore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservation")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id", nullable = false)
    private Long reservationId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "popup_id", nullable = false)
    private PopupStore popupStore;

    @Column(name = "reservation_people", nullable = false, columnDefinition = "INT DEFAULT 1")
    private Integer reservationPeople = 1; // 기본값 1

    @Column(name = "reservation_date", nullable = false)
    private LocalDate reservationDate;

    @Column(name = "reservation_time", nullable = false)
    private LocalTime reservationTime;

    @Column(name = "reservation_confirmed", nullable = false, columnDefinition = "TINYINT DEFAULT 0")
    private Integer reservationConfirmed = 0; // 기본값 0 (0: 미확정, 1: 확정)

    @CreationTimestamp
    @Column(name = "reservation_created_at", updatable = false, columnDefinition = "DATETIME DEFAULT NOW()")
    private LocalDateTime reservationCreatedAt;

    @UpdateTimestamp
    @Column(name = "reservation_updated_at", columnDefinition = "DATETIME DEFAULT NOW()")
    private LocalDateTime reservationUpdatedAt;
}
