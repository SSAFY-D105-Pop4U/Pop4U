import React, { useState, useEffect } from "react";
import GameWait from "../components/Game/GameWait"; // 게임 대기 화면
import GamePlay from "../components/Game/GamePlay"; // 게임 진행 화면
import GameResult from "../components/Game/GameResult"; // 게임 종료 화면
import {useParams } from "react-router-dom";
import "../styles/pages/Game.css";

const Game = () => {
  const [count, setCount] = useState(10); // 게임 진행시간 
  const [isGameOver, setIsGameOver] = useState(false); // 게임 종료 여부
  const [score, setScore] = useState(0); // 클릭 점수
  const [isGameStarted, setIsGameStarted] = useState(false); // 게임 시작 여부
  
  const { popupId } = useParams();
  const userId = sessionStorage.getItem("userId")

  // 10초 타이머 시작 (게임이 시작되었을 때만 실행)
  useEffect(() => {
    if (isGameStarted && count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (count <= 0) {
      setIsGameOver(true); // 10초 후 게임 종료 상태 변경
    }
  }, [count, isGameStarted]);


  return (
    <div className="game-event-container">

      {!isGameStarted ? (
        <GameWait setIsGameStarted={setIsGameStarted} popupId={popupId}/>
      ) : !isGameOver ? (
        <GamePlay count={count} score={score} setScore={setScore} userId={userId} popupId={popupId} />
      ) : (
        <GameResult popupId={popupId} />
      )}
    </div>
  );
};

export default Game;
