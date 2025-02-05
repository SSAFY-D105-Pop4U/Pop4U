package com.d105.pop4u.domain.store.service;

import com.d105.pop4u.domain.category.entity.Category;
import com.d105.pop4u.domain.category.repository.CategoryRepository;
import com.d105.pop4u.domain.category.entity.PopupCategory;
import com.d105.pop4u.domain.category.repository.PopupCategoryRepository;
import com.d105.pop4u.domain.store.dto.PopupStoreDTO;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PopupStoreService {
    private final PopupStoreRepository popupStoreRepository;
    private final CategoryRepository categoryRepository;
    private final PopupCategoryRepository popupCategoryRepository;

    // ✅ 모든 팝업스토어 조회 (카테고리 포함)
    public List<PopupStoreDTO> getAllPopupStores() {
        return popupStoreRepository.findAll()
                .stream()
                .map(store -> {
                    List<Long> categoryIds = getCategoryIdsByPopup(store.getPopupId());
                    return PopupStoreDTO.fromEntity(store, categoryIds);
                })
                .collect(Collectors.toList());
    }

    // ✅ 특정 팝업스토어 조회 (카테고리 포함)
    public PopupStoreDTO getPopupStoreById(Long popupId) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));
        List<Long> categoryIds = getCategoryIdsByPopup(popupId);
        return PopupStoreDTO.fromEntity(popupStore, categoryIds);
    }

    // ✅ 지역별 팝업스토어 조회 (카테고리 포함)
    public List<PopupStoreDTO> getPopupStoresByRegion(String region) {
        return popupStoreRepository.findByPopupRegion(region)
                .stream()
                .map(store -> {
                    List<Long> categoryIds = getCategoryIdsByPopup(store.getPopupId());
                    return PopupStoreDTO.fromEntity(store, categoryIds);
                })
                .collect(Collectors.toList());
    }

    // ✅ 특정 유저가 등록한 팝업스토어 조회 (카테고리 포함)
    public List<PopupStoreDTO> getPopupStoresByUser(Long userId) {
        return popupStoreRepository.findByUserId(userId)
                .stream()
                .map(store -> {
                    List<Long> categoryIds = getCategoryIdsByPopup(store.getPopupId());
                    return PopupStoreDTO.fromEntity(store, categoryIds);
                })
                .collect(Collectors.toList());
    }

    // ✅ 팝업스토어 생성 (카테고리 포함)
    @Transactional
    public PopupStoreDTO createPopupStore(PopupStoreDTO dto) {
        // 1️⃣ 팝업스토어 생성
        PopupStore popupStore = PopupStore.builder()
                .userId(dto.getUserId())
                .popupName(dto.getPopupName())
                .popupRegion(dto.getPopupRegion())
                .popupAddress(dto.getPopupAddress())
                .popupStartDate(dto.getPopupStartDate())
                .popupEndDate(dto.getPopupEndDate())
                .popupOpenTime(dto.getPopupOpenTime())
                .popupClosedTime(dto.getPopupClosedTime())
                .popupDescription(dto.getPopupDescription())
                .popupUrl(dto.getPopupUrl())
                .popupMaximumCapacity(dto.getPopupMaximumCapacity())
                .popupMaximumPeople(dto.getPopupMaximumPeople())
                .build();

        popupStore = popupStoreRepository.save(popupStore);

        // 2️⃣ 카테고리 연결
        if (dto.getCategoryIds() != null && !dto.getCategoryIds().isEmpty()) {
            updatePopupCategories(popupStore, dto.getCategoryIds());
        }

        return PopupStoreDTO.fromEntity(popupStore, dto.getCategoryIds());
    }

    // ✅ 팝업스토어 수정 (카테고리 포함)
    @Transactional
    public PopupStoreDTO updatePopupStore(Long popupId, PopupStoreDTO dto) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));

        // 1️⃣ 기본 정보 업데이트
        popupStore.setPopupName(dto.getPopupName());
        popupStore.setPopupRegion(dto.getPopupRegion());
        popupStore.setPopupAddress(dto.getPopupAddress());
        popupStore.setPopupStartDate(dto.getPopupStartDate());
        popupStore.setPopupEndDate(dto.getPopupEndDate());
        popupStore.setPopupOpenTime(dto.getPopupOpenTime());
        popupStore.setPopupClosedTime(dto.getPopupClosedTime());
        popupStore.setPopupDescription(dto.getPopupDescription());
        popupStore.setPopupUrl(dto.getPopupUrl());
        popupStore.setPopupMaximumCapacity(dto.getPopupMaximumCapacity());
        popupStore.setPopupMaximumPeople(dto.getPopupMaximumPeople());

        popupStore = popupStoreRepository.save(popupStore);

        // 2️⃣ 카테고리 업데이트
        updatePopupCategories(popupStore, dto.getCategoryIds());

        return PopupStoreDTO.fromEntity(popupStore, dto.getCategoryIds());
    }

    // ✅ 팝업스토어 삭제 (연관 카테고리도 삭제)
    @Transactional
    public void deletePopupStore(Long popupId) {
        PopupStore popupStore = popupStoreRepository.findByPopupId(popupId)
                .orElseThrow(() -> new IllegalArgumentException("팝업스토어를 찾을 수 없습니다."));

        // 1️⃣ 연관된 카테고리 삭제
        popupCategoryRepository.deleteByPopupStore(popupStore);

        // 2️⃣ 팝업스토어 삭제
        popupStoreRepository.delete(popupStore);
    }

    // ✅ 특정 팝업의 카테고리 목록 조회
    private List<Long> getCategoryIdsByPopup(Long popupId) {
        return popupCategoryRepository.findByPopupStore_PopupId(popupId)
                .stream()
                .map(pc -> pc.getCategory().getCategoryId())
                .collect(Collectors.toList());
    }

    // ✅ 팝업과 연결된 카테고리 업데이트
    private void updatePopupCategories(PopupStore popupStore, List<Long> categoryIds) {
        // 1️⃣ 기존 카테고리 삭제
        popupCategoryRepository.deleteByPopupStore(popupStore);

        // 2️⃣ 새로운 카테고리 매핑
        if (categoryIds != null && !categoryIds.isEmpty()) {
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
    }
}
