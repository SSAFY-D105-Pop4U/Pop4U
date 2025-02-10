package com.d105.pop4u.domain.review.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateReview {
    private Long userId;          // 사용자 고유번호
    private Long popupId;         // 팝업 고유번호
    private Long reservationId;    // 예약 고유번호
    private String reviewContent;  // 리뷰 내용
    private Integer reviewRating;  // 리뷰 별점
//    private MultipartFile file;    // 리뷰 사진 파일
}
