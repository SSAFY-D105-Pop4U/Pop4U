import React from "react";

const GameResult = ({ score }) => {
  return (
    <div className="game-result">
      <h2>게임 종료!</h2>
      <p>당신의 점수: {score}</p>
      <button onClick={() => window.location.reload()}>다시 하기</button>
    </div>
  );
};

export default GameResult;
