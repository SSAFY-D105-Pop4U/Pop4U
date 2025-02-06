package com.d105.pop4u.domain.reservation.service;

import com.d105.pop4u.domain.reservation.dto.ReservationDTO;
import com.d105.pop4u.domain.reservation.entity.Reservation;
import com.d105.pop4u.domain.reservation.repository.ReservationRepository;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final PopupStoreRepository popupStoreRepository;

    // ✅ 예약 생성 (유저 ID 직접 입력)
    @Transactional
    public ReservationDTO createReservation(ReservationDTO dto) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(dto.getPopupId())
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));

        Reservation reservation = Reservation.builder()
                .userId(dto.getUserId()) // ✅ 유저 ID 직접 입력
                .popupStore(popupStore)
                .reservationPeople(dto.getReservationPeople() != null ? dto.getReservationPeople() : 1) // ✅ 기본값 1
                .reservationDate(dto.getReservationDate())
                .reservationTime(dto.getReservationTime())
                .reservationConfirmed(0)
                .build();

        reservation = reservationRepository.save(reservation);
        return ReservationDTO.fromEntity(reservation);
    }

    // ✅ 특정 유저의 예약 조회
    public List<ReservationDTO> getReservationsByUser(Long userId) {
        return reservationRepository.findByUserId(userId)
                .stream()
                .map(ReservationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ✅ 특정 팝업의 예약 조회
    public List<ReservationDTO> getReservationsByPopup(Long popupId) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));
        return reservationRepository.findByPopupStore(popupStore)
                .stream()
                .map(ReservationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // ✅ 특정 유저의 특정 팝업 예약 취소
    @Transactional
    public void cancelReservation(Long popupId, Long userId) {
        Reservation reservation = reservationRepository.findByPopupStore_PopupIdAndUserId(popupId, userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 예약을 찾을 수 없습니다."));

        reservationRepository.delete(reservation);
    }

    @Transactional
    public ReservationDTO confirmReservation(Long popupId, Long userId) {
        Reservation reservation = reservationRepository.findByPopupStore_PopupIdAndUserId(popupId, userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 팝업에 대한 예약을 찾을 수 없습니다."));

        reservation.setReservationConfirmed(1); // ✅ 예약 확정 (0 → 1)
        reservation = reservationRepository.save(reservation);

        return ReservationDTO.fromEntity(reservation);
    }
}
