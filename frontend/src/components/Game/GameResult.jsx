import React, { useEffect } from "react";
import { getresult } from "../../apis/api/api";
import { useNavigate } from "react-router-dom";

const GameResult = ({popupId}) => {
  const nav = useNavigate();

  const goreturn = () =>{
    nav(`/detail?popupId=${popupId}`)
  }

  // 결과 api요청
  const handleresult = async () => {
    console.log(popupId)
    try {
      const response = await getresult(popupId);
      console.log("결과를 달라 백엔드야");
    } catch (error) {
      console.error("결과 요구 실패:", error);
    }
  };

  useEffect(() => {
    console.log("팝업아이디" ,popupId)
    handleresult();
  }, []);

  return (
    <div className="game-result">
      <h2>게임 종료!</h2>
      <button onClick={goreturn}>완료</button>
    </div>
  );
};

export default GameResult;
