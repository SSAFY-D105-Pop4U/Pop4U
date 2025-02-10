import React from "react";
import '../styles/components/NextButtons.css'

const NextButton = ({ onClick, isDisabled  }) => {
  return (
    <div className="button-container">
      <button className={`next-button ${isDisabled ? "disabled" : ""}`} onClick={ ()=>{
        if(isDisabled) return;
        onClick();
      }
        
        }>
        다음
      </button>
    </div>
  );
};

export default NextButton;
