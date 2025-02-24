package com.d105.pop4u.domain.store.repository;


import com.d105.pop4u.domain.store.entity.PopupStore;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
=======
>>>>>>> 269263a7f563adde489e2ae40d5121b389b81805
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PopupStoreRepository extends JpaRepository<PopupStore, Long> {
    List<PopupStore> findByPopupRegion(String popupRegion);
    // List<PopupStore> findByUser_UserId(Long userId); // 유저 연결 시 코드
    List<PopupStore> findByUserId(Long userId); // 유저 조회 메서드 수정
    Optional<PopupStore> findByPopupId(Long popupId);
<<<<<<< HEAD
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
            "LOWER(c.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<PopupStore> searchByKeywordIncludingCategories(@Param("keyword") String keyword);

    // 관심 카테고리에 해당하는 팝업 조회
    // 사용자의 관심 카테고리 ID 리스트에 해당하는 팝업 조회
    @Query("SELECT DISTINCT ps FROM PopupStore ps JOIN ps.popupCategories pc WHERE pc.category.categoryId IN :categoryIds")
    List<PopupStore> findByCategoryIds(@Param("categoryIds") List<Long> categoryIds);

    // 랜덤 추천 팝업 조회 (DB에 따라 RAND() 함수가 다를 수 있으므로 환경에 맞게 조정)
    @Query(value = "SELECT * FROM popup_store ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<PopupStore> findRandomPopups(@Param("limit") int limit);
=======
    List<PopupStore> findAllByOrderByPopupStartDateDesc();
    List<PopupStore> findAllByOrderByPopupEndDateDesc();
    List<PopupStore> findAllByOrderByPopupViewCountDesc();
>>>>>>> 269263a7f563adde489e2ae40d5121b389b81805
}
