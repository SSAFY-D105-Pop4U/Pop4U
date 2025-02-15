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

  // API 응답 데이터를 저장할 state
  const [popups, setPopups] = useState([]);

  // API 호출 함수
  const fetchMyReservation = async () => {
    try {
      const data = await getmyreservation(); // 배열 형태의 응답
      setPopups(data);                      // popups 배열에 저장
      console.log("팝업 리스트 조회 완료:", data);
    } catch (error) {
      console.error("Failed to load popups", error);
    }
  };

  useEffect(() => {
    fetchMyReservation(); // 컴포넌트 마운트 시 한번만 실행
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
