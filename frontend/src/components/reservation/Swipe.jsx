import React, { useState, useEffect } from "react";
import "../../styles/components/Swipe.css"
import ReservationCard from "./ReservationCard";
import { myreservation } from "../../apis/api/api.js";


const Swipe = () => {
  const cards = [
    {
      id: 1,
      date: "01.22(수)",
      time: "14:00",
      people: "성인 2",
      queue: "15",
      position: "20번째",
      waitingTime: "20분",
      image: "https://d8nffddmkwqeq.cloudfront.net/store/41e90e0e%2C905a%2C4601%2C93e5%2Cbf8b5aa99d7a",
    },
    {
      id: 2,
      date: "01.23(목)",
      time: "16:00",
      people: "성인 3",
      queue: "12",
      position: "15번째",
      waitingTime: "15분",
      image: "https://d8nffddmkwqeq.cloudfront.net/store/41e90e0e%2C905a%2C4601%2C93e5%2Cbf8b5aa99d7a",
    },{
        id: 3,
        date: "01.23(목)",
        time: "16:00",
        people: "성인 3",
        queue: "12",
        position: "15번째",
        waitingTime: "15분",
        image: "https://d8nffddmkwqeq.cloudfront.net/store/41e90e0e%2C905a%2C4601%2C93e5%2Cbf8b5aa99d7a",
      },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragThreshold = 50; // 드래그 임계값 (픽셀)
  const [isWebVersion, setIsWebVersion] = useState(window.innerWidth >= 768);
  
  // 내예약 api 호출
  const handlemy = async () => {
    try {
      const data = await myreservation();
      console.log("📌 API 내예약호출:", data);
    } catch (error) {
      console.error("❌ Failed to load reviews", error);
    }
  };


  useEffect(() => {
    handlemy()


    const handleResize = () => {
      setIsWebVersion(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      if (diff > 0 && currentIndex < cards.length - 1) {
        handleSwipe("left");
      } else if (diff < 0 && currentIndex > 0) {
        handleSwipe("right");
      }
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || startX === null) return;
    const currentX = e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0 && currentIndex < cards.length - 1) {
        handleSwipe("left");
      } else if (diff < 0 && currentIndex > 0) {
        handleSwipe("right");
      }
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
      // 전체 dots가 3개 이하면 모두 표시
      dotsToShow = Array.from({ length: totalDots }, (_, i) => i);
    } else {
      if (currentIndex === 0) {
        // 첫 부분
        dotsToShow = [0, 1, 2];
      } else if (currentIndex === totalDots - 1) {
        // 마지막 부분
        dotsToShow = [totalDots - 3, totalDots - 2, totalDots - 1];
      } else {
        // 중간 부분 - 순서를 반대로
        dotsToShow = [currentIndex + 1, currentIndex, currentIndex - 1];
      }
    }

    return (
      <div className="progress-dots">
        {dotsToShow.map((index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
          />
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
      {cards.map((card, index) => {
        const isActive = index === currentIndex;
        const isNext = index === currentIndex + 1;
        const isPrevious = index === currentIndex - 1;

        return (
          <div
            key={card.id}
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
            <ReservationCard/>
          </div>
        );
      })}
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
