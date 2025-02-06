package com.d105.pop4u.domain.review.service;

import com.d105.pop4u.domain.review.dto.ReviewDto;
import com.d105.pop4u.domain.review.entity.Review;
import com.d105.pop4u.domain.review.mapper.ReviewMapper;
import com.d105.pop4u.domain.review.repository.ReviewRepository;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import com.d105.pop4u.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final PopupStoreRepository popupStoreRepository;

    public List<ReviewDto> getReviewsByPopupId(Long popupId) {
        List<Review> reviews = reviewRepository.findByPopupId(popupId);
        // Review -> ReviewDto 변환
        return reviews.stream()
                .map(ReviewMapper::toDto) // ReviewMapper를 사용하여 변환
                .collect(Collectors.toList());
    }

    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = Review.builder()
                .userId(userRepository.findByUserId(reviewDto.getUserId()).orElseThrow(() -> new RuntimeException("User not found")))
                .popupId(popupStoreRepository.findByPopupId(reviewDto.getPopupId()).orElseThrow(() -> new RuntimeException("Popup not found")))
                .reviewContent(reviewDto.getReviewContent())
                .reviewRating(reviewDto.getReviewRating())
                .reviewImg(reviewDto.getReviewImg())
                .build();
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
