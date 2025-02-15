import React, { useEffect } from "react";
import '../../styles/components/ReservationCard.css';


const ReservationCard = ({reservation} ) => {
  if (!reservation) return null;
  
  useEffect(()=>{
    console.log("예약내역")
  },[])

  return (
    <div className="reservation-card-container">
      <div className="reservation-card-header">
        <img
          src={reservation.image}
          alt="예약 이미지"
          className="reservation-card-image"
        />
      </div>
      <div className="reservation-card-content">
        <h2 className="reservation-card-title">
          {/* 예약 제목이 있다면 표시 */}
          {reservation.popupName ? reservation.popupName : "<예약 제목>"}
        </h2>
        <p>{reservation.location ? reservation.location : "예약 위치"}</p>
        <div className="reservation-card-details">
          <div>
            <strong>예약일</strong>
            <strong className="detail-value">{reservation.date}</strong>
          </div>
          <div>
            <strong>예약시간</strong>
            <strong className="detail-value">{reservation.time}</strong>
          </div>
          <div>
            <strong>인원</strong>
            <strong className="detail-value">{reservation.people}</strong>
          </div>
          <div>
            <strong>대기 번호</strong>
            <strong className="detail-value">{reservation.queue}</strong>
          </div>
        </div>
        <div className="reservation-card-footer">
          <p>순서: {reservation.position}</p>
          <p>예상 대기 시간: {reservation.waitingTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
