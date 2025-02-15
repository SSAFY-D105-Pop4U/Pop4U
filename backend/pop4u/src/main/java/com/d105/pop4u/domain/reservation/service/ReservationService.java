package com.d105.pop4u.domain.reservation.service;

import com.d105.pop4u.domain.reservation.dto.ReservationDTO;
import com.d105.pop4u.domain.reservation.entity.Reservation;
import com.d105.pop4u.domain.reservation.repository.ReservationRepository;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final PopupStoreRepository popupStoreRepository;
    private final UserRepository userRepository; // User 엔티티 조회용

    /**
     * 예약 생성
     * 전달받은 ReservationDTO의 popupId와 userId(Long)를 이용해 각각 PopupStore와 User 엔티티를 조회한 후 예약 생성
     */
    @Transactional
    public ReservationDTO createReservation(ReservationDTO dto) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(dto.getPopupId())
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Reservation reservation = Reservation.builder()
                .user(user)  // User 엔티티 저장
                .popupStore(popupStore)
                .reservationPeople(dto.getReservationPeople() != null ? dto.getReservationPeople() : 1)
                .reservationDate(dto.getReservationDate())
                .reservationTime(dto.getReservationTime())
                .reservationConfirmed(0) // 예약 생성 시 확정되지 않은 상태(0)
                .build();

        reservation = reservationRepository.save(reservation);
        return ReservationDTO.fromEntity(reservation);
    }

    /**
     * 특정 유저의 예약 조회
     */
    public List<ReservationDTO> getReservationsByUser(Long userId) {
        return reservationRepository.findReservationsWithPopupInfo(userId);
    }

    /**
     * 특정 팝업의 예약 조회
     * (브랜드 유저 전용 컨트롤러에서 호출)
     */
    public List<ReservationDTO> getReservationsByPopup(Long popupId) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));
        return reservationRepository.findByPopupStore(popupStore)
                .stream()
                .map(ReservationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 특정 유저의 특정 팝업 예약 취소
     * 팝업 ID와 예약한 User의 userId를 이용해 예약을 찾아 삭제
     */
    @Transactional
    public void cancelReservation(Long popupId, Long userId) {
        Reservation reservation = reservationRepository.findByPopupStore_PopupIdAndUser_UserId(popupId, userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 예약을 찾을 수 없습니다."));
        reservationRepository.delete(reservation);
    }

    /**
     * 예약 확정 (브랜드 유저 전용)
     * 예약 ID로 예약을 조회한 후, 해당 예약이 속한 팝업의 브랜드 소유자와 전달받은 브랜드 유저 ID(brandUserId)를 비교하여 권한 검증
     * 권한이 확인되면 예약의 확정 상태를 1(확정)로 변경
     */
    @Transactional
    public ReservationDTO confirmReservation(Long reservationId, Long brandUserId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("예약을 찾을 수 없습니다."));

        // 브랜드 유저의 권한 검증 (PopupStore에 브랜드 소유자 정보가 있다고 가정)
        if (!reservation.getPopupStore().getUser().getUserId().equals(brandUserId)) {
            throw new AccessDeniedException("해당 예약을 확정할 권한이 없습니다.");
        }

        reservation.setReservationConfirmed(1); // 예약 확정
        reservation = reservationRepository.save(reservation);
        return ReservationDTO.fromEntity(reservation);
    }
}
