package com.d105.pop4u.domain.category.controller;

import com.d105.pop4u.domain.category.dto.CategoryDTO;
import com.d105.pop4u.domain.category.service.UserCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/category/{userId}")
@RequiredArgsConstructor
public class UserCategoryController {

    private final UserCategoryService userCategoryService;

    /**
     * 특정 유저의 관심 카테고리 조회 API
     * GET /category/{userId}
     */
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getUserCategories(@PathVariable Long userId) {
        List<CategoryDTO> categories = userCategoryService.getUserCategories(userId);
        return ResponseEntity.ok(categories);
    }

    /**
     * 특정 유저의 관심 카테고리 수정 API
     * PATCH /category/{userId}
     * 요청 본문 예시: [1, 2, 3] (선택한 카테고리 id 목록)
     */
    @PatchMapping
    public ResponseEntity<Void> updateUserCategories(
            @PathVariable Long userId,
            @RequestBody List<Long> categoryIds) {
        userCategoryService.updateUserCategories(userId, categoryIds);
        return ResponseEntity.ok().build();
    }
}
