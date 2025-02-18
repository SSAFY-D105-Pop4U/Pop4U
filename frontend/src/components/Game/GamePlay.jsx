import React, { useEffect, useState } from "react";
import { postpeople } from "../../apis/api/api";
import present from "../../assets/images/present.png";

const GamePlay = ({ count, score, setScore, userId, popupId }) => {
  const [hasPosted, setHasPosted] = useState(false); // 결과 전송 여부
  const [isClicked, setIsClicked] = useState(false); // ✅ 클릭 애니메이션 상태
  const [clickEffects, setClickEffects] = useState([]); // ✅ 터치 이펙트 저장 배열

  // 🕒 초 단위를 MM:SS 형식으로 변환하는 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  // 클릭 시 점수 증가 및 애니메이션 적용
  const handleClick = (e) => {
    if (score < 10) {
      setScore((prevScore) => prevScore + 1);
      
      // ✅ 클릭 애니메이션 적용
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 300); // 300ms 후 애니메이션 초기화

      // ✅ 클릭한 위치에 터치 이펙트 추가
      const newEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setClickEffects((prev) => [...prev, newEffect]);

      // 500ms 후 효과 제거
      setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id));
      }, 500);
    }
  };

  useEffect(() => {
    if (score === 10 && !hasPosted) {
      const timestamp = new Date().toISOString().slice(0, 19);
      // handleResult(timestamp);
      console.log("10번 클릭 끝 API 요청");
      setHasPosted(true); // 중복 호출 방지
    }
  }, [score, hasPosted]);

  return (
    <div className="game-play">
      <div className="game-event-instructions">
        <div className="play_instruction">10초 동안 최대한 클릭하세요!</div>
      </div>

      {/* 🕒 남은 시간 (MM:SS 형식으로 표시) */}
      <div className="game-event-count">{formatTime(count)}</div> 

      <button
        className="game-click-button"
        onClick={handleClick}
        disabled={score >= 10} // 점수가 10 이상이면 버튼 비활성화
      >
        <img 
          src={present} 
          alt="img" 
          className={`present ${isClicked ? "clicked bounce" : ""}`} // ✅ 클릭 애니메이션 추가
        />
      </button>
      <div className="score">
      {score}
      </div>

      {/* ✅ 클릭한 위치에 터치 이펙트 추가 */}
      {clickEffects.map((effect) => (
        <div
          key={effect.id}
          className="rippleEffect"
          style={{ top: effect.y, left: effect.x }}
        />
      ))}
    </div>
  );
};

export default GamePlay;
