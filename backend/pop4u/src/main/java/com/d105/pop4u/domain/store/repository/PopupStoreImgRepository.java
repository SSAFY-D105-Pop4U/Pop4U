package com.d105.pop4u.domain.store.repository;

import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.entity.PopupStoreImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PopupStoreImgRepository extends JpaRepository<PopupStoreImg, Long> {

    // ✅ 특정 팝업의 모든 이미지 조회
    List<PopupStoreImg> findByPopupStore_PopupId(Long popupId);

    // ✅ 특정 팝업의 모든 이미지 삭제
    @Transactional
    void deleteByPopupStore(PopupStore popupStore);

    // ✅ 특정 이미지 파일을 삭제 (경로 기반)
    @Transactional
    void deleteByPopupImg(String popupImg);
}
