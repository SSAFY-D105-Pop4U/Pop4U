import { useState, useEffect } from "react";
import "../../styles/testlife/LifeShot.css";

const InsertShot = ({ handleNext, isAnimating }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isNewVisible, setIsNewVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 100);

        setTimeout(() => {
            setIsNewVisible(true);
        }, 0);

        setTimeout(() => {
            setIsButtonVisible(true);
        }, 0);
    }, []);

    return (
        <div className={`insert-life-bg ${isAnimating ? "exit" : ""}`}>
            <div className={`new-box new-box-top ${isNewVisible ? "show" : ""}`}></div>
            <div className={`white-box ${isVisible ? "show" : ""}`}></div>
            <div className={`white-box-second ${isVisible ? "show" : ""}`}></div>
            <div className={`new-box new-box-bottom ${isNewVisible ? "show" : ""}`}></div>

            {/* ✅ 버튼 클릭 시 handleNext 실행 */}
            <button onClick={handleNext} className={`life-btn ${isButtonVisible ? "show" : ""}`}>
                클릭하세요
            </button>
        </div>
    );
};

export default InsertShot;
