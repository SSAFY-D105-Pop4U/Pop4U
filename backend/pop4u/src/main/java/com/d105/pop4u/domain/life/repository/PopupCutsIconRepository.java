package com.d105.pop4u.domain.life.repository;

import com.d105.pop4u.domain.life.entity.PopupCutsIcon;
import com.d105.pop4u.domain.store.entity.PopupStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PopupCutsIconRepository extends JpaRepository<PopupCutsIcon, Long> {
    List<PopupCutsIcon> findByPopupStore(PopupStore popupStore);  // 특정 팝업의 아이콘 조회

    @Transactional
    void deleteByPopupStore(PopupStore popupStore);  // 특정 팝업의 모든 아이콘 삭제
}