package com.d105.pop4u.domain.store.controller;


import com.d105.pop4u.domain.store.dto.PopupStoreDTO;
import com.d105.pop4u.domain.store.service.PopupStoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import java.util.List;

@RestController
@RequestMapping("/popup")
@RequiredArgsConstructor
public class PopupStoreController {
    private final PopupStoreService popupStoreService;

    // 모든 팝업스토어 조회
    @GetMapping
    public ResponseEntity<List<PopupStoreDTO>> getAllPopupStores() {
        return ResponseEntity.ok(popupStoreService.getAllPopupStores());
    }

    // 특정 팝업스토어 조회
    @GetMapping("/{popup_id}")
    public ResponseEntity<PopupStoreDTO> getPopupStoreById(@PathVariable Long popup_id) {
        return ResponseEntity.ok(popupStoreService.getPopupStoreById(popup_id));
    }

    // 지역별 팝업스토어 조회
    @GetMapping("/region/{popup_region}")
    public ResponseEntity<List<PopupStoreDTO>> getPopupStoresByRegion(@PathVariable String popup_region) {
        return ResponseEntity.ok(popupStoreService.getPopupStoresByRegion(popup_region));
    }


        // 특정 유저가 등록한 팝업스토어 조회
    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<PopupStoreDTO>> getPopupStoresByUser(@PathVariable Long user_id) {
        return ResponseEntity.ok(popupStoreService.getPopupStoresByUser(user_id));
    }

    // 팝업스토어 생성 (유저 ID 직접 입력)
    @PostMapping("/create")
    public ResponseEntity<PopupStoreDTO> createPopupStore(
            @Valid @RequestBody PopupStoreDTO popupStoreDTO) {
        return ResponseEntity.ok(popupStoreService.createPopupStore(popupStoreDTO));
    }

    // // 특정 브랜드 유저가 등록한 팝업스토어 조회
    // @GetMapping("/user/{user_id}")
    // public ResponseEntity<List<PopupStoreDTO>> getPopupStoresByUser(@PathVariable Long user_id) {
    //     return ResponseEntity.ok(popupStoreService.getPopupStoresByUser(user_id));
    // }

    // // 팝업스토어 생성
    // @PostMapping("/create")
    // public ResponseEntity<PopupStoreDTO> createPopupStore(@RequestBody PopupStoreDTO popupStoreDTO) {
    //     return ResponseEntity.ok(popupStoreService.createPopupStore(popupStoreDTO));
    // }

    // 팝업스토어 수정
    @PatchMapping("/{popup_id}/update")
    public ResponseEntity<PopupStoreDTO> updatePopupStore(
            @PathVariable Long popup_id,
            @Valid @RequestBody PopupStoreDTO popupStoreDTO) {
        return ResponseEntity.ok(popupStoreService.updatePopupStore(popup_id, popupStoreDTO));
    }

    // 팝업스토어 삭제
    @DeleteMapping("/{popup_id}")
    public ResponseEntity<Void> deletePopupStore(@PathVariable Long popup_id) {
        popupStoreService.deletePopupStore(popup_id);
        return ResponseEntity.noContent().build();
    }
}
