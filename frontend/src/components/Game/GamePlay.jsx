import React, { useEffect, useState } from "react";
import { postpeople } from "../../apis/api/api";
import present from "../../assets/images/present.png";


const GamePlay = ({ count, score, setScore, userId, popupId }) => {
  const [hasPosted, setHasPosted] = useState(false); // 결과 전송 여부

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    if (score < 10) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleResult = async (timestamp) => {
    console.log(userId);
    console.log(popupId);
    console.log(timestamp);
    try {
      const response = await postpeople({ popupId, userId, timestamp });
      console.log("10번 클릭 끝난사람 api요청");
    } catch (error) {
      console.error("api요청 실패:", error);
    }
  };

  useEffect(() => {
    if (score === 10 && !hasPosted) {
      const timestamp = new Date().toISOString().slice(0, 19);

      handleResult(timestamp);
      console.log("10번 클릭 끝 API 요청");
      setHasPosted(true); // 중복 호출 방지
    }
  }, [score, hasPosted]);

  return (
    <div className="game-play">
      <div className="game-event-instructions">
        <div className="instruction">10초 동안 최대한 클릭하세요!</div>
      </div>
      <div className="game-event-count">{count}</div>
      <button
        className="game-click-button"
        onClick={handleClick}
        disabled={score >= 10} // 점수가 10 이상이면 버튼 비활성화
      >
        🎁 선물 클릭 ({score})
        <img src={present} alt="img" className="present" />
      </button>
    </div>
  );
};

export default GamePlay;
