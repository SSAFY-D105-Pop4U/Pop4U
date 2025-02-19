import React, { useState, useContext } from "react";
import "../../styles/components/PersonSelector.css";
import Drag from "../../hooks/Drag";
import { AppDataContext } from "../../Context.jsx"; // useContext 추가

const PersonSelector = ({ selectedPerson, setSelectedPerson, maxPeople}) => {
  const { setAppData } = useContext(AppDataContext); // Context 사용

  console.log(parseInt(maxPeople, 10));
  

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
    <div className="person-selector-container" style={{width:"100%"}}>
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
        {[...Array(parseInt(maxPeople, 10)).keys()].map((num) => (
  <div
    key={num + 1}
    className={`person-circle ${selectedPerson === num + 1 ? "person-selected" : ""}`}
    onClick={() => handleSelect(num + 1)}
  >
    {num + 1}명
  </div>
))}
      </div>
    </div>
  );
};

export default PersonSelector;
