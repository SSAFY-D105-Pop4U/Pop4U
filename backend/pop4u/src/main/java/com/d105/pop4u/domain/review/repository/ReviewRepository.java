package com.d105.pop4u.domain.review.repository;

import com.d105.pop4u.domain.review.entity.Review;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // 특정 팝업에 대한 리뷰 목록을 조회하는 메서드
    List<Review> findByPopupId(PopupStore popupStore);

    // 특정 사용자의 리뷰 목록을 조회하는 메서드
    List<Review> findByUserId(User user);

    @Query("select case when count(r) > 0 then true else false end " +
            "from Review r where r.userId = ?1 and r.popupId = ?2")
    boolean existsByUserAndPopup(User user, PopupStore popupStore);

}