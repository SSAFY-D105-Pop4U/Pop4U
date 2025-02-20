import React, { useEffect } from "react";
import '../../styles/components/ReservationCard.css';


const ReservationCard = ({reservation} ) => {
  // console.log(reservation)
  if (!reservation) return null;
  
  useEffect(()=>{
    console.log("예약내역")
  },[])

  return (
    <div className="reservation-card-container">
      <div className="reservation-card-header">
        <img
          src={reservation.popupImage}
          alt="예약 이미지"
          className="reservation-card-image"
        />
      </div>
      <div className="reservation-card-content">
        <h2 className="reservation-card-title">
          {/* 예약 제목이 있다면 표시 */}
          {reservation.popupName ? reservation.popupName : "<예약 제목>"}
        </h2>
        <p>{reservation.reviewWritten ? "리뷰 작성 완료" : "리뷰 작성 안함"}</p>
        <div className="reservation-card-details">
          <div>
            <strong>예약일</strong>
            <strong className="detail-value"> {reservation.reservationDate.substring(5).replaceAll("-", ".")}</strong>
          </div>
          <div>
            <strong>예약시간</strong>
            <strong className="detail-value">{reservation.reservationTime.slice(0, -3)}</strong>
          </div>
          <div>
            <strong>인원</strong>
            <strong className="detail-value">{reservation.reservationPeople}</strong>
          </div>
          <div>
            <strong>대기 번호</strong>
            <strong className="detail-value">{reservation.reservationId}</strong>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ReservationCard;
