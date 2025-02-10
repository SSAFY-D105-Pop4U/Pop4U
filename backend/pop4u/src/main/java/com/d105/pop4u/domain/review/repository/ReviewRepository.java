package com.d105.pop4u.domain.review.repository;

import com.d105.pop4u.domain.review.entity.Review;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // 특정 팝업에 대한 리뷰 목록을 조회하는 메서드
    List<Review> findByPopupId(PopupStore popupStore);

    // 특정 사용자의 리뷰 목록을 조회하는 메서드
    List<Review> findByUserId(User user);

    boolean existsByUserIdAndPopupId(User user, PopupStore popupStore);
}