import { useState } from "react";
import "../styles/components/ReviewLifeShotCard.css";
import { useNavigate } from "react-router-dom";
import { getreviewcheck } from "../apis/api/api.js";


const ReviewLifeShotCard = ({ placeInfo }) => {
  const nav = useNavigate();

  //axios통신으로 팝업 아이콘 불러오는 get요청보내기
  // 에러 터지면 리뷰 모달 출력 or 정상요청되면 인생네컷으로 이동
    const reviewcheck = async () => {
      try {
        const data = await getreviewcheck(placeInfo.popupId);
        console.log("📌 API 응답 (리뷰체크):", data);
        nav("/reviewlifeshot")
        }
       catch (error) {
        console.error("❌ Failed to load popups", error);
        //리뷰작성하러 가시겠습니까 모달창 뜨면서 확인 누르면 이동!!!!!
        nav("/writereview")
      }
    };
  
  const handleOptionClick = () => {
    reviewcheck()
  };

  return (
    <div className="review-life-content">
      <div className="review-life-info">
        <img
          src={placeInfo?.popupImage}
          alt="image"
          className="place-thumbnail"
        />
        <div className="place-details">
          {placeInfo?.popupName}
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="review-options">
        <button className="review-option-button" onClick={handleOptionClick}>
          <div className="option-box">
            <div className="option-text">
              <h3>인생네컷 제작하러 가기</h3>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ReviewLifeShotCard;
