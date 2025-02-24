package com.d105.pop4u.domain.reservation.dto;

import com.d105.pop4u.domain.reservation.entity.Reservation;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class ReservationDTO {
<<<<<<< HEAD
    private Long reservationId; // 예약 id
    private Long userId;
=======
    private Long userId;  // ✅ 유저 ID 직접 입력
>>>>>>> 269263a7f563adde489e2ae40d5121b389b81805
    private Long popupId;
    private Integer reservationPeople;
    private LocalDate reservationDate;
    private LocalTime reservationTime;
    private Integer reservationConfirmed;

    // 팝업 이름과 이미지
    private String popupName;
    private String popupImage;

    // 리뷰 작성 여부 (true: 작성함, false: 작성 안함)
    private boolean reviewWritten;

    // 엔티티 → DTO 변환 메서드 (리뷰 여부를 파라미터로 전달)
    public static ReservationDTO fromEntity(Reservation reservation, boolean reviewWritten) {
        String popupName = reservation.getPopupStore().getPopupName();
        String popupImage = null;
        if (reservation.getPopupStore().getPopupImages() != null &&
                !reservation.getPopupStore().getPopupImages().isEmpty()) {
            // 첫 번째 이미지 가져오기
            popupImage = reservation.getPopupStore().getPopupImages().get(0).getPopupImg();
        }
        return ReservationDTO.builder()
<<<<<<< HEAD
                .reservationId(reservation.getReservationId())
                .userId(reservation.getUser() != null ? reservation.getUser().getUserId() : null)
=======
                .userId(reservation.getUserId())
>>>>>>> 269263a7f563adde489e2ae40d5121b389b81805
                .popupId(reservation.getPopupStore().getPopupId())
                .reservationPeople(reservation.getReservationPeople())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .reservationConfirmed(reservation.getReservationConfirmed())
                .popupName(popupName)
                .popupImage(popupImage)
                .reviewWritten(reviewWritten)
                .build();
    }

    // 리뷰 여부를 명시하지 않은 경우 기본값 false로 처리
    public static ReservationDTO fromEntity(Reservation reservation) {
        return fromEntity(reservation, false);
    }

    // JPQL 쿼리에서 사용하는 생성자
    public ReservationDTO(Long reservationId, Long userId, Long popupId,
                          Integer reservationPeople, LocalDate reservationDate,
                          LocalTime reservationTime, Integer reservationConfirmed,
                          String popupName, String popupImage, boolean reviewWritten) {
        this.reservationId = reservationId;
        this.userId = userId;
        this.popupId = popupId;
        this.reservationPeople = reservationPeople;
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.reservationConfirmed = reservationConfirmed;
        this.popupName = popupName;
        this.popupImage = popupImage;
        this.reviewWritten = reviewWritten;
    }
}
