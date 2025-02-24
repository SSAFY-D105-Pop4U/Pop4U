package com.d105.pop4u.domain.reservation.service;

import com.d105.pop4u.domain.reservation.dto.ReservationDTO;
import com.d105.pop4u.domain.reservation.entity.Reservation;
import com.d105.pop4u.domain.reservation.repository.ReservationRepository;
import com.d105.pop4u.domain.review.repository.ReviewRepository;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final PopupStoreRepository popupStoreRepository;
<<<<<<< HEAD
    private final UserRepository userRepository; // User 엔티티 조회용
    private final ReviewRepository reviewRepository; // 리뷰 Repository 주입
=======
>>>>>>> 269263a7f563adde489e2ae40d5121b389b81805

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

<<<<<<< HEAD
    /**
     * 특정 유저의 예약 조회
     */
    public List<ReservationDTO> getReservationsByUser(Long userId, User user) {
        // 기존 엔티티 조회
        List<Reservation> reservations = reservationRepository.findByUser_UserId(userId);
        List<ReservationDTO> dtos = new ArrayList<>();

        for (Reservation reservation : reservations) {
            // 각 예약에 대해 해당 팝업에 리뷰를 작성했는지 확인
            boolean reviewWritten = reviewRepository.existsByUserAndPopup(user, reservation.getPopupStore());
            dtos.add(ReservationDTO.fromEntity(reservation, reviewWritten));
        }
        return dtos;
=======
    // ✅ 특정 유저의 예약 조회
    public List<ReservationDTO> getReservationsByUser(Long userId) {
        return reservationRepository.findByUserId(userId)
                .stream()
                .map(ReservationDTO::fromEntity)
                .collect(Collectors.toList());
>>>>>>> 269263a7f563adde489e2ae40d5121b389b81805
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
