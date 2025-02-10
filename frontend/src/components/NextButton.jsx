import React from "react";
import "../styles/components/NextButtons.css";

const NextButton = ({ onClick, isDisabled, children }) => {
  return (
    <div className="button-container">
      <button
        className={`next-button ${isDisabled ? "disabled" : ""}`}
        onClick={() => {
          if (isDisabled) return;
          onClick();
        }}
      >
        {children}
      </button>
    </div>
  );
};

export default NextButton;
