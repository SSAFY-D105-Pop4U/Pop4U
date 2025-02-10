package com.d105.pop4u.domain.life.controller;

import com.d105.pop4u.domain.life.dto.PopupCutsIconDto;
import com.d105.pop4u.domain.life.service.PopupCutsIconService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/four_cuts")
@RequiredArgsConstructor
public class PopupCutsIconController {

    private final PopupCutsIconService popupCutsIconService;

    // ✅ 리뷰 작성한 사용자만 아이콘 조회 가능
    @GetMapping("/{popupId}/{userId}")
    public ResponseEntity<List<PopupCutsIconDto>> getIcons(@PathVariable Long popupId, @PathVariable Long userId) {
        return ResponseEntity.ok(popupCutsIconService.getIconsByPopupAndUser(popupId, userId));
    }

    // ✅ FastAPI & S3 적용하여 팝업 아이콘 추가 (관리자 전용)
    @PostMapping(value = "/{popupId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)  // ⬅️ ✅ 필수 수정!
    public ResponseEntity<PopupCutsIconDto> addIcon(
            @PathVariable Long popupId,
            @RequestPart("file") MultipartFile file  // ⬅️ ✅ 요청 필드명 일치 확인
    ) throws IOException {
        return ResponseEntity.ok(popupCutsIconService.addIconToPopup(popupId, file));
    }


    @DeleteMapping("/{iconId}")
    public ResponseEntity<Void> deleteIcon(@PathVariable Long iconId) throws Exception {
        popupCutsIconService.deleteIcon(iconId);
        return ResponseEntity.noContent().build();
    }
}
