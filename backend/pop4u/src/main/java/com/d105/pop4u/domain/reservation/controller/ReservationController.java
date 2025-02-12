package com.d105.pop4u.domain.reservation.controller;

import com.d105.pop4u.domain.reservation.dto.ReservationDTO;
import com.d105.pop4u.domain.reservation.service.ReservationService;
import com.d105.pop4u.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * 예약 생성: 팝업 ID는 경로 변수로 받고,
     * 인증된 User 객체에서 사용자 ID(userId)를 가져와 ReservationDTO에 설정합니다.
     */
    @PostMapping("/{popupId}")
    public ResponseEntity<ReservationDTO> createReservation(
            @PathVariable("popupId") Long popupId,
            @RequestBody ReservationDTO dto,
            @AuthenticationPrincipal User user) { // 여기서 User는 UserDetails를 구현한 엔티티입니다.
        Long userId = user.getUserId();
        dto.setPopupId(popupId);
        dto.setUserId(userId);
        return ResponseEntity.ok(reservationService.createReservation(dto));
    }

    /**
     * 로그인한 사용자의 예약 조회
     */
    @GetMapping("/my")
    public ResponseEntity<List<ReservationDTO>> getMyReservations(
            @AuthenticationPrincipal User user) {
        Long userId = user.getUserId();
        return ResponseEntity.ok(reservationService.getReservationsByUser(userId));
    }

    /**
     * 특정 팝업의 예약 조회 (브랜드 유저 전용)
     * 인증된 User 객체의 userStatus가 1(브랜드)인지 확인하고,
     * 브랜드 유저만 해당 팝업의 예약 목록을 조회할 수 있도록 합니다.
     */
    @GetMapping("/popup/{popupId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByPopupForBrand(
            @PathVariable("popupId") Long popupId,
            @AuthenticationPrincipal User authUser) {
        // 인증된 사용자가 브랜드 계정인지 확인 (userStatus 1이면 브랜드)
        if (authUser.getUserStatus() != 1) {
            throw new AccessDeniedException("브랜드 유저만 접근할 수 있습니다.");
        }
        return ResponseEntity.ok(reservationService.getReservationsByPopup(popupId));
    }

    /**
     * 예약 취소: 팝업 ID는 경로 변수, 사용자 ID는 인증된 User 객체에서 가져옵니다.
     */
    @DeleteMapping("/{popupId}")
    public ResponseEntity<String> cancelReservation(
            @PathVariable("popupId") Long popupId,
            @AuthenticationPrincipal User user) {
        Long userId = user.getUserId();
        reservationService.cancelReservation(popupId, userId);
        return ResponseEntity.ok("예약이 취소되었습니다.");
    }

    /**
     * 예약 확정:
     * 브랜드 유저(로컬 로그인)가 일반 유저의 예약(예약 ID를 통해 식별)을 확정합니다.
     * 인증된 User 객체에서 userStatus가 1(브랜드)여야 하며,
     * 그렇지 않으면 권한 없음 예외를 던집니다.
     */
    @PatchMapping("/confirm/{reservationId}")
    public ResponseEntity<ReservationDTO> confirmReservation(
            @PathVariable("reservationId") Long reservationId,
            @AuthenticationPrincipal User authUser) {
        // 브랜드 유저만 예약 확정이 가능하도록 체크
        if (authUser.getUserStatus() != 1) {
            throw new AccessDeniedException("브랜드 유저만 예약을 확정할 수 있습니다.");
        }
        // 브랜드 유저의 userId는 추가 검증이나 로깅, 소유권 체크에 활용 가능
        Long brandUserId = authUser.getUserId();

        // 서비스 레이어에서 예약 ID로 예약을 조회하고, 해당 예약이
        // 브랜드 유저의 팝업에 속해 있는지 등 추가 검증 후 상태 업데이트 수행
        ReservationDTO confirmedReservation = reservationService.confirmReservation(reservationId, brandUserId);
        return ResponseEntity.ok(confirmedReservation);
    }
}
