package com.d105.pop4u.domain.store.controller;


import com.d105.pop4u.domain.search.dto.SearchRankDTO;
import com.d105.pop4u.domain.search.dto.SearchRankResponseDTO;
import com.d105.pop4u.domain.search.service.SearchRankingService;
import com.d105.pop4u.domain.store.dto.PopupStoreDTO;
import com.d105.pop4u.domain.store.service.PopupStoreService;
import com.d105.pop4u.domain.user.entity.User;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.core.type.TypeReference;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/popup")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PopupStoreController {

    private final PopupStoreService popupStoreService;
    private final SearchRankingService searchRankingService;

    // ✅ 모든 팝업스토어 조회
    @GetMapping
    public Map<String, List<PopupStoreDTO>> getAllPopupStores(
            @RequestParam(name = "fetchAll", defaultValue = "false") boolean fetchAll
    ) {
        // fetchAll 파라미터를 Service로 넘기기
        return popupStoreService.getAllPopupStores(fetchAll);
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


    // ✅ 팝업스토어 생성 (브랜드 유저 전용)
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PopupStoreDTO> createPopupStore(
            @AuthenticationPrincipal User authUser,
            @RequestParam(name = "data", required = true) String popupStoreJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> imageFiles) throws IOException {

        // 브랜드 유저만 접근 가능하도록 체크 (userStatus == 1)
        if(authUser == null || authUser.getUserStatus() != 1) {
            throw new AccessDeniedException("브랜드 유저만 팝업스토어를 생성할 수 있습니다.");
        }

        // JSON 데이터를 DTO 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        PopupStoreDTO popupStoreDTO;
        try {
            popupStoreDTO = objectMapper.readValue(popupStoreJson, PopupStoreDTO.class);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("JSON 파싱 오류: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok(popupStoreService.createPopupStore(popupStoreDTO, imageFiles));
    }


    // ✅ 팝업스토어 수정 (브랜드 유저 전용)
    @PatchMapping(value = "/{popup_id}/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PopupStoreDTO> updatePopupStore(
            @AuthenticationPrincipal User authUser,
            @PathVariable Long popup_id,
            @RequestPart("data") String popupStoreJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> newImages,
            @RequestPart(value = "deleteImages", required = false) String deleteImagesJson) throws IOException {

        // 브랜드 유저만 접근 가능하도록 체크
        if(authUser == null || authUser.getUserStatus() != 1) {
            throw new AccessDeniedException("브랜드 유저만 팝업스토어를 수정할 수 있습니다.");
        }

        // JSON 문자열을 List<String>으로 변환 (삭제할 이미지 목록)
        List<String> deleteImages = null;
        if (deleteImagesJson != null && !deleteImagesJson.isEmpty()) {
            ObjectMapper objectMapper = new ObjectMapper();
            deleteImages = objectMapper.readValue(deleteImagesJson, new TypeReference<List<String>>() {});
        }

        // JSON 데이터를 DTO 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        PopupStoreDTO popupStoreDTO = objectMapper.readValue(popupStoreJson, PopupStoreDTO.class);


        return ResponseEntity.ok(popupStoreService.updatePopupStore(popup_id, popupStoreDTO, newImages, deleteImages));
    }


    // ✅ 팝업스토어 삭제 (브랜드 유저 전용)
    @DeleteMapping("/{popup_id}")
    public ResponseEntity<Void> deletePopupStore(
            @AuthenticationPrincipal User authUser,
            @PathVariable Long popup_id) {
        if(authUser == null || authUser.getUserStatus() != 1) {
            throw new AccessDeniedException("브랜드 유저만 팝업스토어를 삭제할 수 있습니다.");
        }
        popupStoreService.deletePopupStore(popup_id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<PopupStoreDTO>> searchPopupStores(
            @RequestParam String keyword) {
        return ResponseEntity.ok(popupStoreService.searchPopupStores(keyword));
    }

    @GetMapping("/search/ranking")
    public ResponseEntity<List<SearchRankResponseDTO>> getSearchRanking() {
        return ResponseEntity.ok(searchRankingService.getTopSearches());
    }
}
