import React, { useEffect, useState } from "react";
import present from "../../assets/images/present.png";
import "animate.css"; // Animate.css 가져오기
import { getstarttime } from "../../apis/api/api.js";

const GameWait = ({ setIsGameStarted, popupId }) => {
  const [storedStartTime, setStoredStartTime] = useState(null);
  const [startBeforeTime, setStartBeforeTime] = useState(null);
  const [waitTime, setWaitTime] = useState(0);
  const [activeIndexes, setActiveIndexes] = useState([]); // 활성화된 문구 index 배열

  // API에서 시작 시간 요청
  const handlestarttime = async () => {
    try {
      const data = await getstarttime(popupId);
      console.log("게임 시작 시간:", data.startTime); // ✅ 응답 구조 확인

      if (data?.startTime) {
        setStoredStartTime(data.startTime);
        setStartBeforeTime(new Date(new Date(data.startTime).getTime() - 10 * 1000));
      } else {
        console.error("startTime 값이 없습니다.");
      }
    } catch (error) {
      console.log("요청 실패", error);
    }
  };

  useEffect(() => {
    handlestarttime();
  }, []);

  // useEffect(() => {
  //   if (storedStartTime) {
  //     console.log("업데이트된 storedStartTime:", storedStartTime);
  //   }
  // }, [storedStartTime]);

  useEffect(() => {
    if (startBeforeTime === null) return;
    setWaitTime(Math.max(Math.floor((startBeforeTime - new Date()) / 1000), 0));
  }, [startBeforeTime]);

  useEffect(() => {
    if (startBeforeTime === null) return;

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
  }, [startBeforeTime, setIsGameStarted]);

  // 하단 애니메이션 출력
  useEffect(() => {
    setTimeout(() => {
      let delay = 0;
      [0, 1, 2].forEach((index) => {
        setTimeout(() => {
          setActiveIndexes((prev) => [...prev, index]);
        }, delay);
        delay += 500; // 0.5초 간격으로 등장
      });
    }, 700);
  }, []);

  return (
    <div className="game-wait-container">
      <div className="comment">특별 이벤트</div>
      <div className="time">{waitTime}초 후에 시작됩니다!</div>

      <div className="container">
        <img src={present} alt="img" className="present" />
      </div>

      <div className="instructions">
        {[
          "주어진 시간 안에",
          "선물 상자를 가장 빨리",
          "10회 클릭을 하면 선물을 받아요",
        ].map((text, index) => (
          <div
            key={index}
            className={`instruction-item ${
              activeIndexes.includes(index)
                ? "animate__animated animate__fadeInDown animate__slow"
                : "hidden"
            }`}
          >
            <div
              className={`circle ${
                activeIndexes.includes(index) ? "active" : ""
              }`}
            >
              {index + 1}
            </div>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameWait;
