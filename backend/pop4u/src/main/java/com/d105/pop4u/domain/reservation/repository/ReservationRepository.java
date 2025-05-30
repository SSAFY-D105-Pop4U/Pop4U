package com.d105.pop4u.domain.reservation.repository;

import com.d105.pop4u.domain.reservation.dto.ReservationDTO;
import com.d105.pop4u.domain.reservation.entity.Reservation;
import com.d105.pop4u.domain.store.entity.PopupStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
<<<<<<< HEAD
    // User 엔티티의 userId를 기준으로 예약 조회
    List<Reservation> findByUser_UserId(Long userId);

    // 특정 팝업스토어의 예약 조회
    List<Reservation> findByPopupStore(PopupStore popupStore);

    // 특정 팝업의 특정 사용자 예약 조회: PopupStore의 popupId와 User의 userId로 조회
    Optional<Reservation> findByPopupStore_PopupIdAndUser_UserId(Long popupId, Long userId);

    @Query("SELECT new com.d105.pop4u.domain.reservation.dto.ReservationDTO(" +
            "  r.reservationId, " +
            "  r.user.userId, " +
            "  p.popupId, " +
            "  r.reservationPeople, " +
            "  r.reservationDate, " +
            "  r.reservationTime, " +
            "  r.reservationConfirmed, " +
            "  p.popupName, " +
            "  img.popupImg, " +
            "  CASE WHEN EXISTS (SELECT 1 FROM Review rev WHERE rev.userId = r.user AND rev.popupId = p) THEN true ELSE false END" +
            ") FROM Reservation r " +
            "JOIN r.popupStore p " +
            "LEFT JOIN p.popupImages img " +
            "WHERE img.popupImgId = (SELECT MIN(img2.popupImgId) FROM PopupStoreImg img2 WHERE img2.popupStore = p) " +
            "AND r.user.userId = :userId")
    List<ReservationDTO> findReservationsWithPopupInfo(@Param("userId") Long userId);

=======
    List<Reservation> findByUserId(Long userId); // ✅ 유저 ID로 예약 조회
    List<Reservation> findByPopupStore(PopupStore popupStore); // ✅ 특정 팝업의 예약 조회
    Optional<Reservation> findByPopupStore_PopupIdAndUserId(Long popupId, Long userId); // ✅ 특정 팝업의 특정 유저 예약 조회
>>>>>>> 269263a7f563adde489e2ae40d5121b389b81805
}
