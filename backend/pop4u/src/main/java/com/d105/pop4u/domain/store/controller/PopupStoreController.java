package com.d105.pop4u.domain.store.controller;


import com.d105.pop4u.domain.store.dto.PopupStoreDTO;
import com.d105.pop4u.domain.store.service.PopupStoreService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
public class PopupStoreController {
    private final PopupStoreService popupStoreService;

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

//    // ✅ 팝업스토어 생성
//    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<PopupStoreDTO> createPopupStore(
//            @Valid @RequestPart(name = "data", required = true) String popupStoreJson,
//            @RequestPart(value = "images", required = false) List<MultipartFile> imageFiles) throws IOException {
//
//        // ✅ JSON 데이터를 DTO 객체로 변환
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule()); // ✅ Java 8 날짜/시간 지원 추가
//        PopupStoreDTO popupStoreDTO = objectMapper.readValue(popupStoreJson, PopupStoreDTO.class);
//
//
//        return ResponseEntity.ok(popupStoreService.createPopupStore(popupStoreDTO, imageFiles));
//    }

    // ✅ 팝업스토어 생성
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PopupStoreDTO> createPopupStore(
            @RequestParam(name = "data", required = true) String popupStoreJson, // ✅ @RequestPart → @RequestParam 변경
            @RequestPart(value = "images", required = false) List<MultipartFile> imageFiles) throws IOException {

        // 🚀 **요청이 Controller에 들어왔는지 확인 (제일 먼저 추가해야 할 로그)**
        System.out.println("🚀 [DEBUG] 팝업스토어 생성 요청이 도착했습니다.");

        // ✅ JSON 디버깅 로그 추가
        System.out.println("Received JSON: " + popupStoreJson);

        // ✅ JSON 데이터를 DTO 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // ✅ Java 8 날짜/시간 지원 추가
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); // ✅ 불필요한 필드 무시 설정

        PopupStoreDTO popupStoreDTO;
        try {
            popupStoreDTO = objectMapper.readValue(popupStoreJson, PopupStoreDTO.class);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("JSON 파싱 오류: " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }

        // ✅ DTO 변환 후 로그 출력
        System.out.println("Parsed DTO: " + popupStoreDTO);

        return ResponseEntity.ok(popupStoreService.createPopupStore(popupStoreDTO, imageFiles));
    }




    // ✅ 팝업스토어 수정
    @PatchMapping(value = "/{popup_id}/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PopupStoreDTO> updatePopupStore(
            @PathVariable Long popup_id,
            @RequestPart("data") String popupStoreJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> newImages,
            @RequestPart(value = "deleteImages", required = false) String deleteImagesJson) throws IOException {

        // JSON 문자열을 List<String>으로 변환
        List<String> deleteImages = null;
        if (deleteImagesJson != null && !deleteImagesJson.isEmpty()) {
            ObjectMapper objectMapper = new ObjectMapper();
            deleteImages = objectMapper.readValue(deleteImagesJson, new TypeReference<List<String>>() {});
        }

        // JSON 데이터를 DTO 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        PopupStoreDTO popupStoreDTO = objectMapper.readValue(popupStoreJson, PopupStoreDTO.class);

        // 로그 출력
        System.out.println("🔹 수정할 팝업스토어 ID: " + popup_id);
        System.out.println("🔹 업데이트할 데이터: " + popupStoreDTO);
        System.out.println("🔹 새 이미지 개수: " + (newImages != null ? newImages.size() : 0));
        System.out.println("🔹 삭제할 이미지 목록: " + deleteImages);

        return ResponseEntity.ok(popupStoreService.updatePopupStore(popup_id, popupStoreDTO, newImages, deleteImages));
    }


    // ✅ 팝업스토어 삭제
    @DeleteMapping("/{popup_id}")
    public ResponseEntity<Void> deletePopupStore(@PathVariable Long popup_id) {
        popupStoreService.deletePopupStore(popup_id);
        return ResponseEntity.noContent().build();
    }
}
