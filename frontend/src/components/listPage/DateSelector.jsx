import React, { useRef, useState, useEffect } from "react";
import "../../styles/components/DateSelector.css";

const DateSelector = ({selectedDate, setSelectedDate}) => {
  
  const [dates, setDates] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    const generatedDates = Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);

      return {
        date: i === 13 ? "-" : `${date.getMonth() + 1}.${date.getDate()}`,
        label:
          i === 0
            ? "오늘"
            : i === 1
            ? "내일"
            : i === 13
            ? "    "
            : days[date.getDay()],
      };
    });

    setDates(generatedDates);
    setSelectedDate(generatedDates[0].date); // 오늘 날짜를 기본 선택
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // console.log(date);
  };

  const handleDragStart = (e) => {
    scrollRef.current.isDragging = true;
    scrollRef.current.startX = e.pageX || e.touches[0].pageX;
    scrollRef.current.scrollLeft = scrollRef.current.scrollLeft || 0;
  };

  const handleDragMove = (e) => {
    if (!scrollRef.current.isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const speedFactor = 15; // 이 값을 높이면 드래그 속도가 느려짐 (기본값 1 → 2~5 사이 추천)
    const walk = (scrollRef.current.startX - x) / speedFactor;
    scrollRef.current.scrollLeft += walk;
  };

  const handleDragEnd = () => {
    scrollRef.current.isDragging = false;
  };

  useEffect(() => {
    const container = scrollRef.current;

    const touchMoveHandler = (e) => {
      if (scrollRef.current.isDragging) {
        e.preventDefault(); // passive: false로 설정된 경우에만 호출
      }
    };

    container.addEventListener("touchmove", touchMoveHandler, {
      passive: false,
    });

    return () => {
      container.removeEventListener("touchmove", touchMoveHandler);
    };
  }, []);

  return (
    <div className="date-selector-container">
      <div className="date-selector-title">날짜</div>
      <div
        className="date-selector-dates-container"
        ref={scrollRef}
        onMouseDown={(e) => {
          handleDragStart(e);
          e.preventDefault();
        }}
        onMouseMove={(e) => {
          handleDragMove(e);
          e.preventDefault();
        }}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          cursor: "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {dates.map((item) => (
          <div
            key={item.date}
            className={`date-selector-item ${
              item.date === selectedDate ? "selected" : ""
            }`}
            onClick={() => handleDateClick(item.date)
              
              
            }
          >
            <div className="date-selector-date">{item.date}</div>
            <div className="date-selector-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateSelector;
