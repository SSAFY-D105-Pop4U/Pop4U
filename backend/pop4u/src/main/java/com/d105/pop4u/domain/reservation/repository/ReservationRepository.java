package com.d105.pop4u.domain.reservation.repository;

import com.d105.pop4u.domain.reservation.entity.Reservation;
import com.d105.pop4u.domain.store.entity.PopupStore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // User 엔티티의 userId를 기준으로 예약 조회
    List<Reservation> findByUser_UserId(Long userId);

    // 특정 팝업스토어의 예약 조회
    List<Reservation> findByPopupStore(PopupStore popupStore);

    // 특정 팝업의 특정 사용자 예약 조회: PopupStore의 popupId와 User의 userId로 조회
    Optional<Reservation> findByPopupStore_PopupIdAndUser_UserId(Long popupId, Long userId);
}
