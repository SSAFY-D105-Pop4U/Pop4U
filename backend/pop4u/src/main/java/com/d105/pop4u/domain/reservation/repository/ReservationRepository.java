package com.d105.pop4u.domain.reservation.repository;

import com.d105.pop4u.domain.reservation.entity.Reservation;
import com.d105.pop4u.domain.store.entity.PopupStore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId); // ✅ 유저 ID로 예약 조회
    List<Reservation> findByPopupStore(PopupStore popupStore); // ✅ 특정 팝업의 예약 조회
    Optional<Reservation> findByPopupStore_PopupIdAndUserId(Long popupId, Long userId); // ✅ 특정 팝업의 특정 유저 예약 조회
}
