import React, { useState, useEffect } from "react";
import Header from "../components/basic/Header";
import Swipe from "../components/reservation/Swipe";
import "../styles/pages/Reservation.css";
import { deleteReservation } from "../apis/api/api.js";
import BackToHomeButton from "../components/BackTohomeButton.jsx";

const Reservation = () => {
  const [popupId, setPopupId] = useState(0);
  const [initialTime, setInitialTime] = useState("");
  const [isReview, setIsReview] = useState("");
  const [refresh, setRefresh] = useState(0); // Swipe 새로고침용 state

  // 시간을 원하는 형식으로 변환하는 함수
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const period = hours >= 12 ? "오후" : "오전";
    hours = hours % 12 || 12; // 12시간제로 변환

    return `${year}.${month}.${day} ${period} ${hours}:${minutes}:${seconds}`;
  };

  // 페이지 진입 시 한 번만 실행
  useEffect(() => {
    setInitialTime(formatDate(new Date())); // 현재 시간을 초기값으로 설정
  }, []);

  const onClickDelete = async () => {
    try {
      const data = await deleteReservation(popupId);
      console.log(data);
    } catch (error) {
      console.error("Failed to delete reservation:", error);
    } finally {
      // 삭제 후 refresh 상태 변경하여 Swipe 리렌더링
      setRefresh((prev) => prev + 1);
    }
  };

  const handleRemoveClick = () => {
    onClickDelete();
  };

  return (
    <div>
      <div className="header">
        <BackToHomeButton />
        <h2 className="header1">내예약</h2>
      </div>
      <div className="card-container">
        {/* refresh state를 key로 전달하여 리렌더링 유도 */}
        <Swipe key={refresh} type={"예약"} setPopupId={setPopupId} setIsReview={setIsReview} />
        <div className="update-time">{initialTime}</div>
        {!isReview && (
          <button className="cancel-button" onClick={handleRemoveClick}>
            예약취소
          </button>
        )}
      </div>
    </div>
  );
};

export default Reservation;
