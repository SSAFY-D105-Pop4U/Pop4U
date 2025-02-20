import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/basic/Header";
import ReviewLifeShotCard from "../components/ReviewLifeShotCard";
import "../styles/pages/ReviewLifeShot.css";
import Divider from "../components/basic/Divider";
import { getmyreservation } from "../apis/api/api";

const ReviewLifeShot = () => {
  const nav = useNavigate();
  const title = "리뷰&인생네컷";

  
  const [popups, setPopups] = useState([]);

  // API 내 예약팝업리스트 호출
  const MyReservation = async () => {
    try {
      const data = await getmyreservation(); 
      setPopups(Array.isArray(data) ? data : (Array.isArray(data.popups) ? data.popups : []));                    
      console.log("팝업 리스트 조회 완료:", data);
    } catch (error) {
      setPopups([]);
      console.error("Failed to load popups", error);
    }
  };

  useEffect(() => {
    MyReservation(); // 컴포넌트 마운트 시 한번만 실행
  }, []);

  return (
    <div>
      <div className="review-life-header">
        <Header title={title} />
      </div>

      {popups.map((popup, index) => (
        <div key={index}>            
          <ReviewLifeShotCard placeInfo={popup} />
          
          <Divider top="0px" />
        </div>
      ))}
    </div>
  );
};

export default ReviewLifeShot;
