package com.d105.pop4u.domain.review.entity;

import com.d105.pop4u.domain.store.entity.PopupStore;
import com.d105.pop4u.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "review") // 테이블 이름 지정
@Getter
//@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId; // 리뷰 고유번호

//    @Column(name = "user_id", nullable = false)
//    private Long userId; // 회원 고유 번호
    @ManyToOne(fetch = FetchType.LAZY) // 지연 로딩 설정
    @JoinColumn(name = "user_id", nullable = false) // 외래 키 설정
    private User userId; // 회원 엔티티

//    @Column(name = "popup_id", nullable = false)
//    private Long popupId; // 팝업 고유번호
    @ManyToOne(fetch = FetchType.LAZY) // 지연 로딩 설정
    @JoinColumn(name = "popup_id", nullable = false) // 외래 키 설정
    private PopupStore popupId; // 팝업 엔티티

    @Column(name = "review_content", nullable = false)
    private String reviewContent; // 리뷰 내용

    @Column(name = "review_rating", nullable = false)
    private Integer reviewRating; // 리뷰 별점

    @Column(name = "review_img")
    private String reviewImg; // 리뷰 사진 (NULL 허용)

    @Column(name = "review_created_at", nullable = false)
    private LocalDateTime reviewCreatedAt; // 리뷰 생성일자

    @PrePersist
    protected void onCreate() {
        reviewCreatedAt = LocalDateTime.now(); // 생성 시 현재 시간 설정
    }

    public User getUser() {
        return userId; // User 엔티티 반환
    }

    public PopupStore getPopup() {
        return popupId; // PopupStore 엔티티 반환
    }

    public LocalDateTime getReviewCreatedAt() {
        return reviewCreatedAt; // 작성일자를 반환
    }
}