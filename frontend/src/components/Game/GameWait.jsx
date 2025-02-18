import React, { useEffect, useState } from "react";
import present from "../../assets/images/present.png";


const GameWait = ({ setIsGameStarted }) => {
  const storedStartTime = sessionStorage.getItem("startTime");
  const gameStartTime = new Date(storedStartTime);
  const startBeforeTime = new Date(gameStartTime.getTime() - 10 * 1000);

  const [waitTime, setWaitTime] = useState(
    Math.max(Math.floor((startBeforeTime - new Date()) / 1000), 0)
  );
  const [activeIndexes, setActiveIndexes] = useState([]); // 활성화된 원을 저장하는 배열

  useEffect(() => {
    if (waitTime <= 0) {
      setIsGameStarted(true);
      return;
    }

    const timer = setInterval(() => {
      setWaitTime((prevTime) => {
        const newTime = Math.max(
          Math.floor((startBeforeTime - new Date()) / 1000),
          0
        );
        if (newTime <= 0) {
          clearInterval(timer);
          setIsGameStarted(true);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [waitTime, setIsGameStarted, startBeforeTime]);

  useEffect(() => {
    let delay = 0;
    [0, 1, 2].forEach((index) => {
      setTimeout(() => {
        setActiveIndexes((prev) => [...prev, index]); // 기존 배열에 추가하여 유지
      }, delay);
      delay += 700; // 불 들어오는 속도 조절
    });
  }, []);

  return (
    <div className="game-wait-container">
      <div className="comment">특별 이벤트</div>
      <div className="time">{waitTime}초 후에 시작됩니다!</div>
      
{/* <div className="rotating-circle-countdown">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" className="background-circle"></circle>
          <circle
            cx="50"
            cy="50"
            r="45"
            className="progress-circle"
            style={{ strokeDashoffset: 283 - (283 / 10) * waitTime }}
          ></circle>
        </svg>
        <span className="count-text">{waitTime}</span>
      </div> */}

      <div className="container">
        <img src={present} alt="img" className="present" />
      </div>

      <div className="instructions">
        {["주어진 시간 안에", "선물 상자를 가장 많이", "클릭을 하면 선물을 받아요"].map(
          (text, index) => (
            <div key={index} className="instruction-item">
              <div className={`circle ${activeIndexes.includes(index) ? "active" : ""}`}>
                {index + 1}
              </div>
              <p>{text}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default GameWait;
