import React, { useEffect, useState } from "react";

const GameWait = ({ setIsGameStarted }) => {
  const [waitTime, setWaitTime] = useState(5); // 5초 카운트다운

  useEffect(() => {
    if (waitTime <= 0) {
      setIsGameStarted(true); // 5초 후 게임 시작
      return;
    }

    const timer = setInterval(() => {
      setWaitTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [waitTime, setIsGameStarted]);

  return (
    <div className="game-wait">
      <h2>게임이 곧 시작됩니다...</h2>
      <p>{waitTime}초 후에 시작됩니다!</p>
    </div>
  );
};

export default GameWait;
