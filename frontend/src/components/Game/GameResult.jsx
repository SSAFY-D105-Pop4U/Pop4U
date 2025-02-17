import React, { useEffect } from "react";
import {getresult} from "../../apis/api/api"


const GameResult = (score,popupId) => {
    const handleresult = async () => {
            try {
              const response = await getresult(popupId);
              console.log("결과를 달라 백엔드야")
              }
             catch (error) {
              console.error("결과 요구 실패:", error);
            }
          };
  useEffect(()=>{
    handleresult()
  },[])


  return (
    <div className="game-result">
      <h2>게임 종료!</h2>
      <p>당신의 점수: {score}</p>
      <button onClick={() => window.location.reload()}>다시 하기</button>
    </div>
  );
};

export default GameResult;
