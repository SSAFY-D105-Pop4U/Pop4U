package com.d105.pop4u.domain.category.controller;

import com.d105.pop4u.domain.category.dto.CategoryDTO;
import com.d105.pop4u.domain.category.service.UserCategoryService;
import com.d105.pop4u.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserCategoryController {

    private final UserCategoryService userCategoryService;

    /**
     * 로그인한 사용자의 관심 카테고리 조회 API
     * GET /category/user
     * 인증된 User 객체를 사용하여 관심 카테고리를 조회합니다.
     */
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getUserCategories(
            @AuthenticationPrincipal User user) {
        Long userId = user.getUserId();
        List<CategoryDTO> categories = userCategoryService.getUserCategories(userId);
        return ResponseEntity.ok(categories);
    }

    /**
     * 로그인한 사용자의 관심 카테고리 수정 API
     * PATCH /category/user
     * 요청 본문 예시: [1, 2, 3] (선택한 카테고리 id 목록)
     * 인증된 User 객체를 사용하여 관심 카테고리를 업데이트합니다.
     */
    @PatchMapping
    public ResponseEntity<Void> updateUserCategories(
            @AuthenticationPrincipal User user,
            @RequestBody List<Long> categoryIds) {
        Long userId = user.getUserId();
        userCategoryService.updateUserCategories(userId, categoryIds);
        return ResponseEntity.ok().build();
    }
}
