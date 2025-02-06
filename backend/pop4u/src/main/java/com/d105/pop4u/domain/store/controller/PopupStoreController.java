package com.d105.pop4u.domain.store.controller;


import com.d105.pop4u.domain.store.dto.PopupStoreDTO;
import com.d105.pop4u.domain.store.service.PopupStoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/popup")
@RequiredArgsConstructor
public class PopupStoreController {
    private final PopupStoreService popupStoreService;

    // ✅ 모든 팝업스토어 조회
    @GetMapping
    public ResponseEntity<List<PopupStoreDTO>> getAllPopupStores() {
        return ResponseEntity.ok(popupStoreService.getAllPopupStores());
    }

    // ✅ 특정 팝업스토어 조회
    @GetMapping("/{popup_id}")
    public ResponseEntity<PopupStoreDTO> getPopupStoreById(@PathVariable Long popup_id) {
        return ResponseEntity.ok(popupStoreService.getPopupStoreById(popup_id));
    }

    // ✅ 지역별 팝업스토어 조회
    @GetMapping("/region/{popup_region}")
    public ResponseEntity<List<PopupStoreDTO>> getPopupStoresByRegion(@PathVariable String popup_region) {
        return ResponseEntity.ok(popupStoreService.getPopupStoresByRegion(popup_region));
    }

    // ✅ 특정 유저가 등록한 팝업스토어 조회
    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<PopupStoreDTO>> getPopupStoresByUser(@PathVariable Long user_id) {
        return ResponseEntity.ok(popupStoreService.getPopupStoresByUser(user_id));
    }

    // ✅ 팝업스토어 생성
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PopupStoreDTO> createPopupStore(
            @Valid @RequestPart(name = "data", required = true) String popupStoreJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> imageFiles) throws IOException {

        // ✅ JSON 데이터를 DTO 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // ✅ Java 8 날짜/시간 지원 추가
        PopupStoreDTO popupStoreDTO = objectMapper.readValue(popupStoreJson, PopupStoreDTO.class);


        return ResponseEntity.ok(popupStoreService.createPopupStore(popupStoreDTO, imageFiles));
    }


    // ✅ 팝업스토어 수정
    @PatchMapping(value = "/{popup_id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PopupStoreDTO> updatePopupStore(
            @PathVariable Long popup_id,
            @Valid @RequestPart("data") PopupStoreDTO popupStoreDTO,
            @RequestPart(value = "images", required = false) List<MultipartFile> newImages,
            @RequestPart(value = "deleteImages", required = false) List<String> deleteImages) throws IOException {
        return ResponseEntity.ok(popupStoreService.updatePopupStore(popup_id, popupStoreDTO, newImages, deleteImages));
    }

    // ✅ 팝업스토어 삭제
    @DeleteMapping("/{popup_id}")
    public ResponseEntity<Void> deletePopupStore(@PathVariable Long popup_id) {
        popupStoreService.deletePopupStore(popup_id);
        return ResponseEntity.noContent().build();
    }
}
