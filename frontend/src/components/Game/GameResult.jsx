// 게임 결과화면
import React, { useEffect, useState } from "react";
import { getresult } from "../../apis/api/api";
import { useNavigate } from "react-router-dom";
import openpresent from "../../assets/images/openpresent.png";
import "animate.css";

const GameResult = ({ popupId }) => {
  const nav = useNavigate();
  const [rank, setRank] = useState(null); // 🔥 등수를 저장할 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 🔥 모달 상태 추가

  const goreturn = () => {
    nav(`/detail?popupId=${popupId}`);
  };

  // 게임 결과 API 요청
  const handleresult = async () => {
    console.log(popupId);
    try {
      const response = await getresult(popupId);
      console.log(response); // API 응답 확인

      if (response?.data?.rank) {
        setRank(response.data.rank); // 🔥 등수 업데이트
      } else {
        console.error("API 응답에 등수(rank) 값이 없습니다.");
      }
    } catch (error) {
      console.error("결과 요청 실패:", error);
    }
  };

  useEffect(() => {
    console.log("팝업아이디", popupId);
    handleresult();
  }, []);

  return (
    <div className="game-result">
            {/* 결과보기 버튼튼*/}
            <div className="result-button-container">
        <button className="result_button" onClick={() => setIsModalOpen(true)}>
          결과보기
        </button>
      </div>
      <div className="scoreresult">
        <div className="animate__animated animate__fadeInDown animate__slow large-text">
          참여자 중 {rank !== null ? `${rank}등` : "등수 계산 중..."}이에요
        </div>
      </div>
      <div className="container">
        <img src={openpresent} alt="openpresent" className="openpresent" />
      </div>




      {/*모달창*/}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate__animated animate__fadeIn">
            <h2>게임 결과</h2>
            <p>참여자 중 <strong>{rank !== null ? `${rank}등` : "등수 계산 중..."}</strong>입니다!</p>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}

      <div className="complete">
        <button className="button-style" onClick={goreturn}>
          완료
        </button>
      </div>
    </div>
  );
};

export default GameResult;
