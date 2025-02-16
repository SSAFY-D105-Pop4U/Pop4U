package com.d105.pop4u.domain.review.service;

import com.d105.pop4u.domain.reservation.entity.Reservation;
import com.d105.pop4u.domain.reservation.repository.ReservationRepository;
import com.d105.pop4u.domain.review.dto.CreateReview;
import com.d105.pop4u.domain.review.dto.ReviewDto;
import com.d105.pop4u.domain.review.entity.Review;
import com.d105.pop4u.domain.review.mapper.ReviewMapper;
import com.d105.pop4u.domain.review.repository.ReviewRepository;
import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.store.repository.PopupStoreRepository;
import com.d105.pop4u.domain.user.entity.User;
import com.d105.pop4u.domain.user.repository.UserRepository;
import com.d105.pop4u.global.config.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final PopupStoreRepository popupStoreRepository;
    private final ReservationRepository reservationRepository;
    private final S3Service s3Service; // S3Service 주입

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

//    public ReviewDto createReview(ReviewDto reviewDto, MultipartFile multipartFile) throws IOException {
//        // User 엔티티 조회
//        User user = userRepository.findByUserId(reviewDto.getUserId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // PopupStore 엔티티 조회
//        PopupStore popup = popupStoreRepository.findById(reviewDto.getPopupId())
//                .orElseThrow(() -> new RuntimeException("Popup not found"));
//
//        // MultipartFile을 File로 변환
//        File tempFile = File.createTempFile("temp", multipartFile.getOriginalFilename());
//        multipartFile.transferTo(tempFile); // 파일 전송
//
//        // S3에 파일 업로드 및 URL 반환
//        String path = "popupReview/" + popup.getPopupId() + "/" + user.getUserId() + "/reviewImg/" + LocalDateTime.now();
//        String fileUrl = s3Service.uploadS3(tempFile, path); // 업로드할 경로 설정
//
//        // 임시 파일 삭제
//        tempFile.delete();
//
//        // Review 객체 생성
//        Review review = Review.builder()
//                .userId(user)
//                .popupId(popup)
//                .reviewContent(reviewDto.getReviewContent())
//                .reviewRating(reviewDto.getReviewRating())
//                .reviewImg(fileUrl)
//                .build();
//
//        // 리뷰 저장
//        Review savedReview = reviewRepository.save(review);
//        return ReviewMapper.toDto(savedReview); // 변환 후 반환
//    }

    public ReviewDto createReview(CreateReview createReview, MultipartFile multipartFile) throws IOException {
        // User 엔티티 조회
        User user = userRepository.findByUserId(createReview.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // PopupStore 엔티티 조회
        PopupStore popup = popupStoreRepository.findById(createReview.getPopupId())
                .orElseThrow(() -> new RuntimeException("Popup not found"));

        // Reservation 엔티티 조회
        Reservation reservation = reservationRepository.findById(createReview.getReservationId())
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        String fileUrl = null; // 파일 URL 초기화

        // MultipartFile이 null이 아닐 경우에만 처리
        if (multipartFile != null && !multipartFile.isEmpty()) {
            File tempFile = File.createTempFile("temp", multipartFile.getOriginalFilename());
            multipartFile.transferTo(tempFile); // 파일 전송

            // S3에 파일 업로드 및 URL 반환
            String path = "popupReview/" + popup.getPopupId() + "/" + user.getUserId() + "/reviewImg/" + LocalDateTime.now();
            fileUrl = s3Service.uploadS3(tempFile, path); // 업로드할 경로 설정

            // 임시 파일 삭제
            tempFile.delete();
        }

        // Review 객체 생성
        Review review = Review.builder()
                .userId(user)
                .popupId(popup)
                .reservationId(reservation)
                .reviewContent(createReview.getReviewContent())
                .reviewRating(createReview.getReviewRating())
                .reviewImg(fileUrl) // fileUrl이 null일 수도 있음
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

    public List<ReviewDto> getReviewsByUserId(Long userId) {
        // User 엔티티 조회
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 해당 사용자의 리뷰 목록 조회
        List<Review> reviews = reviewRepository.findByUserId(user);

        // Review -> ReviewDto 변환
        return reviews.stream()
                .map(ReviewMapper::toDto) // ReviewMapper를 사용하여 변환
                .collect(Collectors.toList());
    }

}
