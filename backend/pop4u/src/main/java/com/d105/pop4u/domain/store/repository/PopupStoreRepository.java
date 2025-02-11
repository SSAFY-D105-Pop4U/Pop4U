package com.d105.pop4u.domain.store.repository;


import com.d105.pop4u.domain.store.entity.PopupStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PopupStoreRepository extends JpaRepository<PopupStore, Long> {
    List<PopupStore> findByPopupRegion(String popupRegion);
     List<PopupStore> findByUser_UserId(Long userId); // 유저 연결 시 코드
//    List<PopupStore> findByUserId(Long userId); // 유저 조회 메서드 수정
    Optional<PopupStore> findByPopupId(Long popupId);
    List<PopupStore> findTop10ByOrderByPopupStartDateDesc();
    List<PopupStore> findTop10ByOrderByPopupEndDateDesc();
    List<PopupStore> findTop10ByOrderByPopupViewCountDesc();
    // ✅ 채팅방이 없는 팝업스토어 찾기
    @Query("SELECT p FROM PopupStore p WHERE p.popupId NOT IN (SELECT c.popupStore.popupId FROM ChatRoom c)")
    List<PopupStore> findPopupsWithoutChatRooms();
}
