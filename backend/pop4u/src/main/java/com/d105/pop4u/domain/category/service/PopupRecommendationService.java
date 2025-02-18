package com.d105.pop4u.domain.category.service;

import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import com.d105.pop4u.domain.category.entity.UserCategory;
import com.d105.pop4u.domain.category.repository.UserCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PopupRecommendationService {

    private final PopupStoreRepository popupStoreRepository;
    private final UserCategoryRepository userCategoryRepository;

    public PopupRecommendationService(PopupStoreRepository popupStoreRepository,
                                      UserCategoryRepository userCategoryRepository) {
        this.popupStoreRepository = popupStoreRepository;
        this.userCategoryRepository = userCategoryRepository;
    }

    /**
     * 사용자 관심 카테고리 기반 팝업스토어 추천
     * @param optionalUserId Optional 사용자 ID (로그인 여부에 따라 존재)
     * @return 추천 팝업스토어 목록
     */
    public List<PopupStore> getRecommendedPopups(Optional<Long> optionalUserId) {
        // 로그인한 경우
        if (optionalUserId.isPresent()) {
            Long userId = optionalUserId.get();
            List<UserCategory> userCategories = userCategoryRepository.findByUser_UserId(userId);

            // 관심 카테고리 ID 리스트 추출
            List<Long> categoryIds = userCategories.stream()
                    .map(userCategory -> userCategory.getCategory().getCategoryId()) // 만약 UserCategory가 Category 엔티티를 직접 가지고 있다면
                    .collect(Collectors.toList());

            if (!categoryIds.isEmpty()) {
                List<PopupStore> popupStores = popupStoreRepository.findByCategoryIds(categoryIds);
                if (!popupStores.isEmpty()) {
                    return popupStores;
                }
            }
        }
        // 로그인하지 않았거나 관심 기반 추천 결과가 없으면 랜덤 추천 (예: 10개)
        return popupStoreRepository.findRandomPopups(10);
    }
}
