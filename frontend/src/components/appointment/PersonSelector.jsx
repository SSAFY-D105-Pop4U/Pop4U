import React, { useState } from "react";
import "../../styles/components/PersonSelector.css";
import Drag from "../../hooks/Drag";
const PersonSelector = ({ selectedPerson, setSelectedPerson }) => {

    

  const handleSelect = (number) => {
    setSelectedPerson(number); // 선택된 번호 업데이트
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
    } =Drag();
    return (
        <div className="person-selector-container">

<div className="person-selector" ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
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
    )

}

export default PersonSelector

