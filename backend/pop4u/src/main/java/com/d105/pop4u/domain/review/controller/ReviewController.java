package com.d105.pop4u.domain.review.controller;

import com.d105.pop4u.domain.review.dto.CreateReview;
import com.d105.pop4u.domain.review.dto.ReviewDto;
import com.d105.pop4u.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/{popupId}")
    public ResponseEntity<List<ReviewDto>> getReviews(@PathVariable Long popupId) {
        List<ReviewDto> reviews = reviewService.getReviewsByPopupId(popupId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ReviewDto> createReview(@RequestPart("review") CreateReview createReview,
                                                  @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        // 파일과 함께 CreateReview DTO를 사용하여 리뷰 생성
        ReviewDto createdReview = reviewService.createReview(createReview, file);
        return ResponseEntity.ok(createdReview);
    }


    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByUserId(@PathVariable Long userId) {
        List<ReviewDto> reviews = reviewService.getReviewsByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

}