import React, { useState, useEffect } from "react";
import "../../styles/components/Swipe.css";
import ReservationCard from "./ReservationCard";
import { myreservation } from "../../apis/api/api.js";
import CouponCard from "../coupon/CouponCard.jsx";

const Swipe = ({type, setPopupId}) => {
  // API 데이터를 저장할 상태로 변경
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragThreshold = 50; // 드래그 임계값 (픽셀)
  const [isWebVersion, setIsWebVersion] = useState(window.innerWidth >= 768);
  const [loading, setLoading] = useState(true);

  // 내예약 API 호출 및 상태 업데이트
  const fetchReservations = async () => {
    try {
      const response = await myreservation();
      // console.log("📌 API 내예약 호출 결과:", response);
      if (response) {
        setCards(response);
        // console.log("저장완료")
      }
    } catch (error) {
      setCards([]);
      console.error("❌ Failed to load reservations", error);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    if (cards.length > 0) {
      setPopupId(cards[currentIndex]?.popupId || 0);
      // console.log("🔄 현재 popupId:", cards[currentIndex]?.popupId);
    }
  }, [currentIndex, cards, setPopupId]); 

  useEffect(() => {
    fetchReservations();
    const handleResize = () => {
      setIsWebVersion(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // []: 마운트 시 한 번만 실행

  useEffect(() => {
    // console.log(cards.length); 
  }, []);

  
  if (loading) {
    return <p className="loading">로딩 중...</p>;
  }
  
  if (cards.length === 0) {
    return <p className="no-reservations">예약된 내역이 없습니다.</p>;
  }



  const handleSwipe = (direction) => {
    if (direction === "left" && currentIndex < cards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (direction === "right" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || startX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > dragThreshold) {
      diff > 0 ? handleSwipe("left") : handleSwipe("right");
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || startX === null) return;
    const currentX = e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > dragThreshold) {
      diff > 0 ? handleSwipe("left") : handleSwipe("right");
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setStartX(null);
    setIsDragging(false);
  };

  const renderDots = () => {
    const totalDots = cards.length;
    let dotsToShow = [];

    if (totalDots <= 3) {
      dotsToShow = Array.from({ length: totalDots }, (_, i) => i);
    } else {
      if (currentIndex === 0) {
        dotsToShow = [0, 1, 2];
      } else if (currentIndex === totalDots - 1) {
        dotsToShow = [totalDots - 3, totalDots - 2, totalDots - 1];
      } else {
        dotsToShow = [currentIndex + 1, currentIndex, currentIndex - 1];
      }
    }

    return (
      <div className="progress-dots">
        {dotsToShow.map((index) => (
          <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} />
        ))}
      </div>
    );
  };


  return (
    <div 
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {cards.length === 0 ? (
  <p className="no-reservations">예약된 내역이 없습니다.</p>
) : (
  cards.slice().reverse().map((card, index) => {
    const isActive = index === currentIndex;
    const isNext = index === currentIndex + 1;
    const isPrevious = index === currentIndex - 1;

    return (
      <div
        key={card.reservationId}
        className={`slider-card ${isActive ? "slider-active" : ""} ${isNext ? "slider-next" : ""} ${isPrevious ? "slider-previous" : ""}`}
        style={{
          transform: isActive
            ? "translateX(0%) scale(1)"
            : isNext
            ? "translateX(100%) scale(0.9)"
            : isPrevious
            ? "translateX(-100%) scale(0.9)"
            : index < currentIndex
            ? "translateX(-200%) scale(0.8)"
            : "translateX(200%) scale(0.8)",
          opacity: isActive || isNext || isPrevious ? 1 : 0,
        }}
      >
        {(type === "쿠폰") && (<CouponCard reservation={card} />)}
        {(type === "예약") && (<ReservationCard reservation={card} />)}
      </div>
    );
  })
)}
      {isWebVersion && (
        <>
          <button
            className="swipe-button left"
            onClick={() => handleSwipe("right")}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            className="swipe-button right"
            onClick={() => handleSwipe("left")}
            disabled={currentIndex === cards.length - 1}
          >
            &gt;
          </button>
        </>
      )}
      {renderDots()}

      
    </div>
  );
};

export default Swipe;
