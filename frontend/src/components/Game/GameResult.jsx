import React, { useEffect } from "react";
import { getresult } from "../../apis/api/api";
import { useNavigate } from "react-router-dom";
import openpresent from "../../assets/images/openpresent.png";
import "animate.css";

const GameResult = ({ popupId }) => {
  const nav = useNavigate();

  const goreturn = () => {
    nav(`/detail?popupId=${popupId}`);
  };

  // 게임 결과 api요청
  const handleresult = async () => {
    console.log(popupId);
    try {
      const response = await getresult(popupId);
      console.log(response)
    } catch (error) {
      console.error("결과 요구 실패:", error);
    }
  };

  useEffect(() => {
    console.log("팝업아이디", popupId);
    handleresult();
  }, []);

  return (
    <div className="game-result">
      <div className="scoreresult">
        <div className="animate__animated animate__fadeInDown animate__slow large-text">
          참여자 중 11 등이에요
        </div>
      </div>
      <div className="container">
  <img 
    src={openpresent} 
    alt="openpresent" 
    className="openpresent"
  />
</div>
      <div className="complete">
        <button className="button-style" onClick={goreturn}>
          완료
        </button>
      </div>
    </div>
  );
};

export default GameResult;
