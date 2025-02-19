import React, { useEffect, useState } from "react";
import present from "../../assets/images/present.png";
import "animate.css"; // Animate.css 가져오기
import {getstarttime} from "../../apis/api/api.js"

const GameWait = ({ setIsGameStarted,popupId }) => {
  const storedStartTime = sessionStorage.getItem("startTime");
  const gameStartTime = new Date(storedStartTime);
  const startBeforeTime = new Date(gameStartTime.getTime() - 10 * 1000);

  const [waitTime, setWaitTime] = useState(
    Math.max(Math.floor((startBeforeTime - new Date()) / 1000), 0)
  );
  const [activeIndexes, setActiveIndexes] = useState([]); // 활성화된 문구 index 배열

  //시작 시간 요청 함수
  const handlestarttime = async() => {
    
    try{
      const data = await getstarttime({popupId});
      console.log(popupId)
    }catch (error){
      console.log("요청 실패")
    }
  }
  
  useEffect(()=>{
    handlestarttime()
  },[])

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

  // 1초 뒤에 애니메이션 시작 (0.5초 간격으로 나타나게 함)
  useEffect(() => {
    setTimeout(() => {
      let delay = 0;
      [0, 1, 2].forEach((index) => {
        setTimeout(() => {
          setActiveIndexes((prev) => [...prev, index]); // 기존 배열에 추가하여 유지
        }, delay);
        delay += 500; // 0.5초 간격으로 등장
      });
    }, 700); // 페이지 진입 후 1초 뒤에 실행
  }, []);



  return (
    <div className="game-wait-container">
      <div className="comment">특별 이벤트</div>
      <div className="time">{waitTime}초 후에 시작됩니다!</div>
      
      <div className="container">
        <img src={present} alt="img" className="present" />
      </div>

      <div className="instructions">
        {["주어진 시간 안에", "선물 상자를 가장 빨리", "10회 클릭을 하면 선물을 받아요"].map(
          (text, index) => (
            <div 
              key={index} 
              className={`instruction-item ${
                activeIndexes.includes(index) ? "animate__animated animate__fadeInDown animate__slow" : "hidden"
              }`}
            >
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
