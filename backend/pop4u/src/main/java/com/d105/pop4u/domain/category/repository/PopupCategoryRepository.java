package com.d105.pop4u.domain.category.repository;

import com.d105.pop4u.domain.category.entity.PopupCategory;
import com.d105.pop4u.domain.store.entity.PopupStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PopupCategoryRepository extends JpaRepository<PopupCategory, Long> {
    List<PopupCategory> findByPopupStore_PopupId(Long popupId);

    void deleteByPopupStore(PopupStore popupStore);

    // ✅ 특정 팝업과 카테고리 ID에 해당하는 데이터 삭제
    @Transactional
    void deleteByPopupStoreAndCategory_CategoryId(PopupStore popupStore, Long categoryId);
}
