import React from "react";
import basicProfile from "../assets/images/basicProfile.png";
import starImage from "../assets/icons/fullstar.png";
import "../styles/components/ReviewItem.css";

const ReviewItem = ({ reviews }) => {

  if (!reviews || reviews.length === 0) {
    return <p>리뷰가 없습니다.</p>; // ✅ reviews가 비어있을 때 처리
  }

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.reviewId} className="review-item">
          <div className="profile">
            {/* <img src={basicProfile} alt="프로필" className="profile-img" /> */}
            <div className="info">
              <div className="username">{review.userNickname || "익명"}</div>
              <div className="rating_day">
                
                <div className="rating">
                  {Array.from({ length: review.reviewRating }, (_, index) => (
                    <img key={index} src={starImage} alt="별점" className="star-img" />
                  ))}
                </div>
                <div className="date">{review.reviewCreatedAt}</div>
              </div>
            </div>
          </div>
          <div className="review_comment">{review.reviewContent}</div>
          {review.reviewImg && <img src={review.reviewImg} alt="리뷰 이미지" className="review-img" />}
          <div style={{ width: "100%", height: "1px", border: "1px #EFEFF0 solid", margin: "10px 0" }} />
        </div>
      ))}
    </div>
  );
};

export default ReviewItem;
