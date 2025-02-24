package com.d105.pop4u.domain.reservation.controller;

import com.d105.pop4u.domain.reservation.dto.ReservationDTO;
import com.d105.pop4u.domain.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
=======
>>>>>>> 269263a7f563adde489e2ae40d5121b389b81805
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    // ✅ 예약 생성 (유저 ID 직접 입력)
    @PostMapping("/{popup_id}")
    public ResponseEntity<ReservationDTO> createReservation(
<<<<<<< HEAD
            @PathVariable("popupId") Long popupId,
            @RequestBody ReservationDTO dto,
            @AuthenticationPrincipal User user) { // 여기서 User는 UserDetails를 구현한 엔티티입니다.
        if (user == null) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null) {
                // 인증 정보가 있는 경우 로그 출력
                System.out.println("Authenticated user: " + authentication.getPrincipal());
            }
            throw new IllegalArgumentException("인증된 사용자가 없습니다.");
        }
        Long userId = user.getUserId();
        dto.setPopupId(popupId);
        dto.setUserId(userId);
        return ResponseEntity.ok(reservationService.createReservation(dto));
    }

    /**
     * 로그인한 사용자의 예약 조회
     */
    @GetMapping("/my")
    public ResponseEntity<List<ReservationDTO>> getMyReservations(@AuthenticationPrincipal User user) {
        Long userId = user.getUserId();
        return ResponseEntity.ok(reservationService.getReservationsByUser(userId, user));
=======
            @PathVariable Long popup_id,
            @RequestBody ReservationDTO dto) {
        dto.setPopupId(popup_id); // 팝업 ID 설정
        return ResponseEntity.ok(reservationService.createReservation(dto));
    }

    // ✅ 특정 유저의 예약 조회
    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByUser(@PathVariable Long user_id) {
        return ResponseEntity.ok(reservationService.getReservationsByUser(user_id));
>>>>>>> 269263a7f563adde489e2ae40d5121b389b81805
    }

    // ✅ 특정 팝업의 예약 조회
    @GetMapping("/popup/{popup_id}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByPopup(@PathVariable Long popup_id) {
        return ResponseEntity.ok(reservationService.getReservationsByPopup(popup_id));
    }

    // ✅ 예약 취소 (특정 유저의 특정 팝업 예약 삭제)
    @DeleteMapping("/{popup_id}/{user_id}")
    public ResponseEntity<String> cancelReservation(
            @PathVariable Long popup_id,
            @PathVariable Long user_id) {
        reservationService.cancelReservation(popup_id, user_id);
        return ResponseEntity.ok("예약이 취소되었습니다.");
    }
    // ✅ 예약 확정 (특정 유저의 특정 팝업 예약 확정)
    @PatchMapping("/confirm/{popupId}/{userId}")
    public ResponseEntity<ReservationDTO> confirmReservation(
            @PathVariable Long popupId,
            @PathVariable Long userId) {
        return ResponseEntity.ok(reservationService.confirmReservation(popupId, userId));
    }

}
