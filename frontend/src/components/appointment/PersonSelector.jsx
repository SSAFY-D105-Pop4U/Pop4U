import React, { useState, useContext } from "react";
import "../../styles/components/PersonSelector.css";
import Drag from "../../hooks/Drag";
import { AppDataContext } from "../../Context.jsx"; // useContext 추가

const PersonSelector = ({ selectedPerson, setSelectedPerson }) => {
  const { setAppData } = useContext(AppDataContext); // Context 사용

  const handleSelect = (number) => {
    setSelectedPerson(number); // 선택된 번호 업데이트
    
    setAppData((prev) => ({
      ...prev,
      selectedPerson: number, // Context에 저장
    }));
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
    <div className="person-selector-container">
      <div
        className="person-selector"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <div
            key={num}
            className={`person-circle ${selectedPerson === num ? "person-selected" : ""}`}
            onClick={() => handleSelect(num)}
          >
            {num}명
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonSelector;
