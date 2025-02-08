package com.d105.pop4u.domain.review.service;

import com.d105.pop4u.domain.review.dto.ReviewDto;
import com.d105.pop4u.domain.review.entity.Review;
import com.d105.pop4u.domain.review.mapper.ReviewMapper;
import com.d105.pop4u.domain.review.repository.ReviewRepository;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final PopupStoreRepository popupStoreRepository;

    public List<ReviewDto> getReviewsByPopupId(Long popupId) {
        // PopupStore 엔티티 조회
        PopupStore popup = popupStoreRepository.findByPopupId(popupId)
                .orElseThrow(() -> new RuntimeException("Popup not found"));

        // 해당 팝업에 대한 리뷰 목록 조회
        List<Review> reviews = reviewRepository.findByPopupId(popup);

        // Review -> ReviewDto 변환
        return reviews.stream()
                .map(ReviewMapper::toDto) // ReviewMapper를 사용하여 변환
                .collect(Collectors.toList());
    }

    public ReviewDto createReview(ReviewDto reviewDto) {
        // User 엔티티 조회
        User user = userRepository.findByUserId(reviewDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // PopupStore 엔티티 조회
        PopupStore popup = popupStoreRepository.findById(reviewDto.getPopupId())
                .orElseThrow(() -> new RuntimeException("Popup not found"));

        // Review 객체 생성
        Review review = Review.builder()
                .userId(user)
                .popupId(popup)
                .reviewContent(reviewDto.getReviewContent())
                .reviewRating(reviewDto.getReviewRating())
                .reviewImg(reviewDto.getReviewImg())
                .build();

        // 리뷰 저장
        Review savedReview = reviewRepository.save(review);
        return ReviewMapper.toDto(savedReview); // 변환 후 반환
    }

    public void deleteReview(Long reviewId) {
        // 리뷰가 존재하는지 확인 후 삭제
        if (!reviewRepository.existsById(reviewId)) {
            throw new RuntimeException("Review not found");
        }
        reviewRepository.deleteById(reviewId);
    }
}
