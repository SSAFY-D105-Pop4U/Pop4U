import React, { useEffect, useState } from "react";
import { postresult } from "../../apis/api/api";
const GamePlay = ({ count, score, setScore, userId, popupId }) => {
  
  const [hasPosted, setHasPosted] = useState(false); // 결과 전송 여부

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    if (score < 10) {
      setScore((prevScore) => prevScore + 1);
    }
  };
  
    const handleResult = async () => {
      console.log(userId)
      console.log(popupId)
          try {
            console.log("로그인 요청:", loginData);
            const response = await postresult(popupId,userId);
            console.log("10번 클릭 끝난사람 api요청")
            }
           catch (error) {
            console.error("로그인 실패:", error);
          }
        };

  // 점수가 10이 되면 한 번만 `postResult` 실행
  useEffect(() => {
    if (score >= 10 && !hasPosted) {
      handleResult()
      (score);
      console.log("10번클릭 끝 api 요청")
      setHasPosted(true); // 중복 호출 방지
    }
  }, [score, hasPosted, postResult]);

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
      </button>
    </div>
  );
};

export default GamePlay;
