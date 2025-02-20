import React, { useState, useEffect } from "react";
import GameWait from "../components/Game/GameWait";
import GamePlay from "../components/Game/GamePlay";
import GameResult from "../components/Game/GameResult";
import { useParams } from "react-router-dom";
import "../styles/pages/Game.css";

const Game = () => {
  const [count, setCount] = useState(5);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const { popupId } = useParams();
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (isGameStarted && count > 0) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (count <= 0) {
      setIsGameOver(true);
    }
  }, [count, isGameStarted]);

  // ✅ 동적으로 뷰포트 높이 설정
  useEffect(() => {
    const setViewportHeight = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  return (
    <div className="game-event-container">
      {!isGameStarted ? (
        <GameWait setIsGameStarted={setIsGameStarted} popupId={popupId} />
      ) : !isGameOver ? (
        <GamePlay count={count} score={score} setScore={setScore} userId={userId} popupId={popupId} />
      ) : (
        <GameResult popupId={popupId} userId={userId} />
      )}
    </div>
  );
};

export default Game;
