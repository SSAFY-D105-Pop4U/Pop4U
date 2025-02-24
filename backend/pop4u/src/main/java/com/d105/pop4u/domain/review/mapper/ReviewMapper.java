package com.d105.pop4u.domain.review.mapper;

import com.d105.pop4u.domain.review.dto.ReviewDto;
import com.d105.pop4u.domain.review.entity.Review;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;

public class ReviewMapper {

    private final UserRepository userRepository; // UserRepository 주입
    private final PopupStoreRepository popupStoreRepository; // PopupStoreRepository 주입

    public ReviewMapper(UserRepository userRepository, PopupStoreRepository popupStoreRepository) {
        this.userRepository = userRepository;
        this.popupStoreRepository = popupStoreRepository;
    }

    public static ReviewDto toDto(Review review) {
        return new ReviewDto(
                review.getReviewId(),
                review.getUser().getUserId(), // User ID
                review.getPopup().getPopupId(), // Popup ID
                review.getReviewContent(),
                review.getReviewRating(),
                review.getReviewImg(),
                review.getReviewCreatedAt().toLocalDate(),
                review.getUser().getUserNickname() // 추가된 닉네임
        );
    }

    public Review toEntity(ReviewDto reviewDto) {
        User user = userRepository.findByUserId(reviewDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")); // User 조회
        PopupStore popup = popupStoreRepository.findByPopupId(reviewDto.getPopupId())
                .orElseThrow(() -> new RuntimeException("Popup not found")); // Popup 조회

        return Review.builder()
                .reviewId(reviewDto.getReviewId())
                .userId(user)
                .popupId(popup)
                .reviewContent(reviewDto.getReviewContent())
                .reviewRating(reviewDto.getReviewRating())
                .reviewImg(reviewDto.getReviewImg())
                .build();
    }
}
