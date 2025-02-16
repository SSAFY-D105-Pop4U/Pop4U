package com.d105.pop4u.domain.review.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDto {
    private Long reviewId;         // 리뷰 고유번호
    private Long userId;           // 회원 고유 번호
    private Long popupId;          // 팝업 고유번호
    private String reviewContent;   // 리뷰 내용
    private Integer reviewRating;   // 리뷰 별점
    private String reviewImg;       // 리뷰 사진

    private String userNickname;    // 회원 닉네임 추가

    @JsonFormat(pattern = "yyyy-MM-dd") // 날짜 형식 지정
    private LocalDate reviewCreatedAt; // 작성일자

    // 생성자
    public ReviewDto(Long reviewId, Long userId, Long popupId, String reviewContent,
                     Integer reviewRating, String reviewImg, LocalDate reviewCreatedAt, String userNickname) {
        this.reviewId = reviewId;
        this.userId = userId;
        this.popupId = popupId;
        this.reviewContent = reviewContent;
        this.reviewRating = reviewRating;
        this.reviewImg = reviewImg;
        this.reviewCreatedAt = reviewCreatedAt;
        this.userNickname = userNickname; // 초기화
    }
}
