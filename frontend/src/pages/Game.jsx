import React from "react";
import "../styles/pages/game.css"
// import "../assets/images/present.png"

const Game = () => {
  return (
    <div className="game-event-container">
      <div className="game-event-header" />
      <div className="game-event-instructions">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="divider" />
        <div className="divider" />
        <div className="instruction">주어진 시간 안에</div>
        <div className="instruction">선물 상자를 가장 많이</div>
        <div className="instruction">클릭을 하면 선물을 받아요</div>
        <div className="step">1</div>
        <div className="step">2</div>
        <div className="step">3</div>
      </div>

      <div className="game-event-title">
        <div className="event-title">특별 이벤트</div>
        <div className="event-description">곧 있으면 깜짝 이벤트 게임이 시작됩니다</div>
      </div>



      {/* <img className="game-event-image" src={} alt="Event" /> */}
      <div className="game-event-count">49</div>
    </div>
  );
};

export default Game;
