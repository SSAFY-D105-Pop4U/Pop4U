import { useRef, useState, useEffect } from "react";
import popup1Image from "../../assets/images/popup1.png";
import "../../styles/components/HomeHorizScroll.css";
import { useNavigate } from "react-router-dom";
import Drag from "../../hooks/Drag";

const HomeHorizScroll = ({ popups }) => {
  const nav = useNavigate();

  

  const handleCardClick = (index) => {
    nav(`/detail?popupId=${index}`);
  };

  const {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = Drag();

  return (
    <div className="horizontal-scroll">
      <div
        className="scroll-container"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {popups.map((item, index) => (
          <div
            key={item.popupId} // popupId를 key 값으로 설정 (중복 방지)
            className={`card ${index === 0 ? "first-card" : ""} ${
              index === popups.length - 1 ? "last-card" : ""
            }`}
            onClick={() => handleCardClick(item.popupId)} // 클릭 시 popupId 전달
          >
            <img
              src={item.popupImages[0]} // 첫 번째 이미지 사용
              alt={item.popupName} // 팝업스토어 이름을 alt로 설정
              className="card-image"
              draggable="false"
            />
            <div className="card-content">
              <h4 className="card-title">{item.popupName}</h4> {/* 팝업 이름 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeHorizScroll;
