import React, { useState, useEffect } from "react";
import Header from "../components/basic/Header";
import Swipe from "../components/reservation/Swipe";
import "../styles/pages/Reservation.css";

import { deleteReservation } from "../apis/api/api.js";

const Reservation = () => {
  const [popupId, setPopupId] = useState(0);
  const [initialTime, setInitialTime] = useState("");

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
  }, []); // 빈 배열로 설정하여 한 번만 실행

  const onClickDelete = async () => {
        try {
          const data = await deleteReservation(popupId);
          console.log(data);
          
        } catch (error) {
          console.error("Failed to load popups:", error);
        } finally {
        }
      };

  const handleRemoveClick = () => {
    onClickDelete();
    console.log("현재 선택된 예약 ID:", popupId);
  };

  return (
    <div>
      <Header title={"내 예약"} />
      <div className="card-container">
        <Swipe type={"예약"} setPopupId={setPopupId} />
        <div className="update-time">{initialTime}</div>
        <button className="cancel-button" onClick={handleRemoveClick}>
          예약취소
        </button>
      </div>
    </div>
  );
};

export default Reservation;
