import React, { useEffect, useState } from "react";
import { getresult } from "../../apis/api/api";
import { useNavigate } from "react-router-dom";
import openpresent from "../../assets/images/openpresent.png";
import "animate.css";

const GameResult = ({ popupId, userId }) => {
  const nav = useNavigate();
  const [rank, setRank] = useState(null); // 🔥 내 등수 상태 추가
  const [topRanks, setTopRanks] = useState([]); // 🔥 상위 5명의 데이터
  const [isModalOpen, setIsModalOpen] = useState(false); // 🔥 모달 상태 추가

  const goreturn = () => {
    nav(`/detail?popupId=${popupId}`);
  };

  // 게임 결과 API 요청
  const handleresult = async () => {
    console.log("🆔 팝업아이디:", popupId);
    try {
      const response = await getresult(popupId);
      console.log("📢 API 응답:", response);

      if (response?.data?.length > 0) {
        setTopRanks(response.data.slice(0, 5)); // 🔥 처음부터 5명만 가져오기

        console.log("🔍 전체 랭킹 데이터:", response.data);
        console.log("🆔 현재 유저 ID:", userId, "(타입:", typeof userId, ")");

        const myRankData = response.data.find(player => String(player.userId) === String(userId));

        console.log("🏆 찾은 내 랭킹 데이터:", myRankData);

        if (myRankData) {
          console.log("🔥 내 등수 설정:", myRankData.rank);
          setRank(myRankData.rank);
        } else {
          console.warn("⚠ 내 등수를 찾지 못했습니다.");
        }
      } else { 
        console.error("API 응답에 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("결과 요청 실패:", error);
    }
  };

  useEffect(() => {
    handleresult();
  }, []);

  // 🔄 `rank` 값 변경 감지
  useEffect(() => {
    console.log("🔄 업데이트된 rank 값:", rank);
  }, [rank]);

  return (
    <div className="game-result">
      {/* 결과보기 버튼 */}
      <div className="result-button-container">
        <button className="result_button" onClick={() => setIsModalOpen(true)}>
          랭킹보기
        </button>
      </div>

      <div className="scoreresult">
        <div className="animate__animated animate__fadeInDown animate__slow large-text">
          참여자 중 {rank !== null ? `${rank}등` : "등수 계산 중... "}이에요
        </div> 
      </div>

      <div className="container">
        <img src={openpresent} alt="openpresent" className="openpresent" />
      </div>

      {/* 모달창 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate__animated animate__fadeIn">
            <h2>게임 결과</h2>
            <ul>
              {topRanks.map((player, index) => (
                <li key={index}>
                 <strong>{player.rank}등</strong> {player.nickname}
                </li>
              ))}
            </ul>
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
