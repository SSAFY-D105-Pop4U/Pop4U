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
    private Long userId;
    private Long popupId;
    private Integer reservationPeople;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private Integer reservationConfirmed;

    // 추가: 팝업 이름과 이미지
    private String popupName;
    private String popupImage;

    // 엔티티 → DTO 변환 메서드
    public static ReservationDTO fromEntity(Reservation reservation) {
        String popupName = reservation.getPopupStore().getPopupName();
        String popupImage = null;
        if (reservation.getPopupStore().getPopupImages() != null &&
                !reservation.getPopupStore().getPopupImages().isEmpty()) {
            // 첫 번째 이미지 가져오기
            popupImage = reservation.getPopupStore().getPopupImages().get(0).getPopupImg();
        }
        return ReservationDTO.builder()
                .userId(reservation.getUser() != null ? reservation.getUser().getUserId() : null)
                .popupId(reservation.getPopupStore().getPopupId())
                .reservationPeople(reservation.getReservationPeople())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .reservationConfirmed(reservation.getReservationConfirmed())
                .popupName(popupName)
                .popupImage(popupImage)
                .build();
    }

    // JPQL 쿼리에서 사용하는 생성자 추가 (popupId, popupName, popupImage)
    public ReservationDTO(Long popupId, String popupName, String popupImage) {
        this.popupId = popupId;
        this.popupName = popupName;
        this.popupImage = popupImage;
    }
}
