import React, { useEffect } from "react";
import '../../styles/components/CouponCard.css';


const CouponCard = ({reservation} ) => {
  console.log(reservation)
  if (!reservation) return null;
  
  useEffect(()=>{
    console.log("예약내역")
  },[])

  return (
    <div className="coupon-card-container">
      <div className="coupon-card-header">
        <img
          src={reservation.popupImage}
          alt="예약 이미지"
          className="coupon-card-image"
        />
      </div>
      <div className="coupon-card-content">
        <h2 className="coupon-card-title">
          {/* 예약 제목이 있다면 표시 */}
          {reservation.popupName ? reservation.popupName : "<예약 제목>"}
        </h2>
        
        <div className="coupon-card-details">
          
        </div>
        <div className="coupon-card-footer">

            <div className="coupon-FREE-PASS">
                FREE PASS
            </div>


          <div className="coupon-btn">
            직원 확인
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
