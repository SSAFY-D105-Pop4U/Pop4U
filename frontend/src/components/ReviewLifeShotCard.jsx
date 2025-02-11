import { useState } from 'react';
import '../styles/components/ReviewLifeShotCard.css';
import Divider from '../components/basic/Divider';
import { useNavigate } from "react-router-dom";
const ReviewLifeShotCard = ({ placeInfo,isReview=false}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isReviewCompleted, setIsReviewCompleted] = useState(isReview);

  const nav = useNavigate();

  const popupId = 1

  const handleOptionClick = (option) => {
    if (option === 'review') {
      // 리뷰 작성 페이지로 이동하는 로직 추가
      nav(`/writeReview?popupId=${popupId}`)
    }
    setSelectedOption(option);
  };

  return (
    <div className="review-life-content">
      <div className="review-life-info">
        <img 
          src={placeInfo?.image || "/path/to/default/image.jpg"} 
          alt={placeInfo?.name || "장소 이미지"}
          className="place-thumbnail"
        />
        <div className="place-details">
          {placeInfo?.name || "스미코구라시 팝업스토어"}
        </div>
      </div>

      <div className="review-options">
        {isReviewCompleted && (
          <button 
            className="review-option-button"
            onClick={() => handleOptionClick('lifeshot')}
          >
            <div className="option-box">
              <div className="option-text">
                <h3>인생네컷 제작하러 가기</h3>
              </div>
            </div>
          </button>
        )}

        <button 
          className="review-option-button"
          onClick={() => handleOptionClick('review')}
          disabled={isReviewCompleted}
        >
          <div className="option-box">
            <div className="option-text">
              <h3>{isReviewCompleted ? "리뷰 작성 완료" : "리뷰 작성하러 가기"}</h3>
              
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ReviewLifeShotCard; 