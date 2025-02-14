package com.d105.pop4u.domain.store.repository;


import com.d105.pop4u.domain.store.entity.PopupStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("SELECT p FROM PopupStore p WHERE LOWER(p.popupName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<PopupStore> searchByName(@Param("keyword") String keyword);

    // 통합 검색 (이름, 설명, 지역으로 검색)
    @Query("SELECT p FROM PopupStore p WHERE " +
            "LOWER(p.popupName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.popupDescription) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.popupRegion) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<PopupStore> searchByKeyword(@Param("keyword") String keyword);

    // 카테고리와 함께 검색
    @Query("SELECT DISTINCT p FROM PopupStore p " +
            "LEFT JOIN p.popupCategories pc " +
            "LEFT JOIN pc.category c " +
            "WHERE " +
            "REPLACE(LOWER(p.popupName), ' ', '') LIKE LOWER(CONCAT('%', REPLACE(:keyword, ' ', ''), '%')) OR " +
            "LOWER(p.popupName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.popupDescription) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.popupRegion) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "EXISTS (SELECT 1 FROM Category cat " +
            "WHERE cat IN (SELECT pc2.category FROM PopupCategory pc2 WHERE pc2.popupStore = p) " +
            "AND LOWER(cat.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<PopupStore> searchByKeywordIncludingCategories(@Param("keyword") String keyword);
}
