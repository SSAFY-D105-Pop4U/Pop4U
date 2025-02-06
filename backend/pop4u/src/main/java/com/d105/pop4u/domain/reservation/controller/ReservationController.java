package com.d105.pop4u.domain.reservation.controller;

import com.d105.pop4u.domain.reservation.dto.ReservationDTO;
import com.d105.pop4u.domain.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
            @PathVariable Long popup_id,
            @RequestBody ReservationDTO dto) {
        dto.setPopupId(popup_id); // 팝업 ID 설정
        return ResponseEntity.ok(reservationService.createReservation(dto));
    }

    // ✅ 특정 유저의 예약 조회
    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByUser(@PathVariable Long user_id) {
        return ResponseEntity.ok(reservationService.getReservationsByUser(user_id));
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
