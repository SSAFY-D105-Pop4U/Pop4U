package com.d105.pop4u.domain.category.controller;

import com.d105.pop4u.domain.category.service.PopupCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/popup-category")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PopupCategoryController {
    private final PopupCategoryService popupCategoryService;

    // ✅ 팝업에 카테고리 추가
    @PostMapping("/{popupId}")
    public ResponseEntity<String> addCategoriesToPopup(
            @PathVariable Long popupId,
            @RequestBody List<Long> categoryIds) {
        popupCategoryService.addCategoriesToPopup(popupId, categoryIds);
        return ResponseEntity.ok("카테고리가 추가되었습니다.");
    }

    // ✅ 팝업에 연결된 카테고리 수정
    @PatchMapping("/{popupId}")
    public ResponseEntity<String> updatePopupCategories(
            @PathVariable Long popupId,
            @RequestBody List<Long> categoryIds) {
        popupCategoryService.updatePopupCategories(popupId, categoryIds);
        return ResponseEntity.ok("카테고리가 업데이트되었습니다.");
    }

    // ✅ 팝업에서 특정 카테고리 삭제
    @DeleteMapping("/{popupId}/{categoryId}")
    public ResponseEntity<String> removeCategoryFromPopup(
            @PathVariable Long popupId,
            @PathVariable Long categoryId) {
        popupCategoryService.removeCategoryFromPopup(popupId, categoryId);
        return ResponseEntity.ok("카테고리가 삭제되었습니다.");
    }

    // ✅ 특정 팝업에 연결된 카테고리 조회
    @GetMapping("/{popupId}")
    public ResponseEntity<List<String>> getCategoriesByPopup(@PathVariable Long popupId) {
        return ResponseEntity.ok(popupCategoryService.getCategoriesByPopup(popupId));
    }
}
