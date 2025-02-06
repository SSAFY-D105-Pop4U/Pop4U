package com.d105.pop4u.domain.category.service;

import com.d105.pop4u.domain.category.entity.Category;
import com.d105.pop4u.domain.category.repository.CategoryRepository;
import com.d105.pop4u.domain.category.entity.PopupCategory;
import com.d105.pop4u.domain.category.repository.PopupCategoryRepository;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PopupCategoryService {
    private final PopupCategoryRepository popupCategoryRepository;
    private final PopupStoreRepository popupStoreRepository;
    private final CategoryRepository categoryRepository;

    // ✅ 팝업에 카테고리 연결 추가
    @Transactional
    public void addCategoriesToPopup(Long popupId, List<Long> categoryIds) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));

        for (Long categoryId : categoryIds) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리 ID: " + categoryId));

            PopupCategory popupCategory = PopupCategory.builder()
                    .popupStore(popupStore)
                    .category(category)
                    .build();

            popupCategoryRepository.save(popupCategory);
        }
    }

    // ✅ 팝업에 연결된 카테고리 수정 (기존 카테고리 삭제 후 새로 추가)
    @Transactional
    public void updatePopupCategories(Long popupId, List<Long> categoryIds) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));

        // 기존 연결된 카테고리 삭제
        popupCategoryRepository.deleteByPopupStore(popupStore);

        // 새 카테고리 추가
        addCategoriesToPopup(popupId, categoryIds);
    }

    // ✅ 팝업에 연결된 특정 카테고리 삭제
    @Transactional
    public void removeCategoryFromPopup(Long popupId, Long categoryId) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));

        PopupCategory popupCategory = popupCategoryRepository.findByPopupStore_PopupId(popupId).stream()
                .filter(pc -> pc.getCategory().getCategoryId().equals(categoryId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("팝업에 해당 카테고리가 존재하지 않습니다."));

        popupCategoryRepository.delete(popupCategory);
    }

    // ✅ 특정 팝업에 연결된 카테고리 조회
    public List<String> getCategoriesByPopup(Long popupId) {
        return popupCategoryRepository.findByPopupStore_PopupId(popupId)
                .stream()
                .map(pc -> pc.getCategory().getCategoryName())
                .collect(Collectors.toList());
    }
}
