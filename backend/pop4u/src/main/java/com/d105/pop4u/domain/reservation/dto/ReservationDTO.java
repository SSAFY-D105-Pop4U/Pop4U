package com.d105.pop4u.domain.reservation.dto;

import com.d105.pop4u.domain.reservation.entity.Reservation;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationDTO {
    private Long userId;  // ✅ 유저 ID 직접 입력
    private Long popupId;
    private Integer reservationPeople;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private Integer reservationConfirmed;

    // ✅ 엔티티 → DTO 변환 메서드
    public static ReservationDTO fromEntity(Reservation reservation) {
        return ReservationDTO.builder()
                .userId(reservation.getUserId())
                .popupId(reservation.getPopupStore().getPopupId())
                .reservationPeople(reservation.getReservationPeople())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .reservationConfirmed(reservation.getReservationConfirmed())
                .build();
    }
}
