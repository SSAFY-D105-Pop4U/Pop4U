package com.d105.pop4u.domain.category.controller;

import com.d105.pop4u.domain.category.dto.CategoryDTO;
import com.d105.pop4u.domain.category.service.PopupRecommendationService;
import com.d105.pop4u.domain.category.service.UserCategoryService;
import com.d105.pop4u.domain.store.dto.PopupStoreDTO;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.d105.pop4u.domain.store.entity.PopupStoreImg;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/category/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserCategoryController {

    private final UserCategoryService userCategoryService;
    private final PopupRecommendationService recommendationService;

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

    @GetMapping("/recommendation")
    public ResponseEntity<List<PopupStoreDTO>> getRecommendedPopups(
            @AuthenticationPrincipal User user) {
        Optional<Long> optionalUserId = (user != null) ? Optional.of(user.getUserId()) : Optional.empty();
        List<PopupStore> popupStores = recommendationService.getRecommendedPopups(optionalUserId);

        List<PopupStoreDTO> dtos = popupStores.stream().map(store -> {
            // 카테고리 ID 리스트 추출 (popupCategories에서 Category의 식별자 사용)
            List<Long> categoryIds = store.getPopupCategories() != null
                    ? store.getPopupCategories().stream()
                    .map(pc -> pc.getCategory().getCategoryId()) // Category 엔티티의 식별자 필드 이름에 맞게 수정하세요.
                    .collect(Collectors.toList())
                    : Collections.emptyList();

            // 이미지 URL 리스트 추출 (PopupStoreImg의 popupImg 필드 사용)
            List<String> popupImages = store.getPopupImages() != null
                    ? store.getPopupImages().stream()
                    .map(PopupStoreImg::getPopupImg)
                    .collect(Collectors.toList())
                    : Collections.emptyList();

            return PopupStoreDTO.fromEntity(store, categoryIds, popupImages);
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }


}
