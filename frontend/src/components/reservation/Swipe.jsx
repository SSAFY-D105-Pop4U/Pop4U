import React, { useState } from "react";
import "../../styles/components/Swipe.css"
import ReservationCard from "./ReservationCard";

const Swipe = () => {
  const cards = [
    {
      id: 1,
      date: "01.22(수)",
      time: "14:00",
      people: "성인 2",
      queue: "15",
      position: "20번째",
      waitingTime: "20분",
      image: "https://d8nffddmkwqeq.cloudfront.net/store/41e90e0e%2C905a%2C4601%2C93e5%2Cbf8b5aa99d7a",
    },
    {
      id: 2,
      date: "01.23(목)",
      time: "16:00",
      people: "성인 3",
      queue: "12",
      position: "15번째",
      waitingTime: "15분",
      image: "https://d8nffddmkwqeq.cloudfront.net/store/41e90e0e%2C905a%2C4601%2C93e5%2Cbf8b5aa99d7a",
    },{
        id: 3,
        date: "01.23(목)",
        time: "16:00",
        people: "성인 3",
        queue: "12",
        position: "15번째",
        waitingTime: "15분",
        image: "https://d8nffddmkwqeq.cloudfront.net/store/41e90e0e%2C905a%2C4601%2C93e5%2Cbf8b5aa99d7a",
      },{
        id: 4,
        date: "01.23(목)",
        time: "16:00",
        people: "성인 3",
        queue: "12",
        position: "15번째",
        waitingTime: "15분",
        image: "https://d8nffddmkwqeq.cloudfront.net/store/41e90e0e%2C905a%2C4601%2C93e5%2Cbf8b5aa99d7a",
      },
    // Add more cards as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "left" && currentIndex < cards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (direction === "right" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="slider-container">
    {cards.map((card, index) => {
      const isActive = index === currentIndex;
      const isNext = index === currentIndex + 1;
      const isPrevious = index === currentIndex - 1;

      return (
        <div
          key={card.id}
          className={`slider-card ${isActive ? "slider-active" : ""} ${isNext ? "slider-next" : ""} ${isPrevious ? "slider-previous" : ""}`}
          style={{
            transform: isActive
              ? "translateX(0%) scale(1)"
              : isNext
              ? "translateX(100%) scale(0.9)"
              : isPrevious
              ? "translateX(-100%) scale(0.9)"
              : index < currentIndex
              ? "translateX(-200%) scale(0.8)"
              : "translateX(200%) scale(0.8)",
            opacity: isActive || isNext || isPrevious ? 1 : 0,
          }}
        >
          <ReservationCard/>
        </div>
      );
    })}
    <button
      className="swipe-button left"
      onClick={() => handleSwipe("right")}
      disabled={currentIndex === 0}
    >
      &lt;
    </button>
    <button
      className="swipe-button right"
      onClick={() => handleSwipe("left")}
      disabled={currentIndex === cards.length - 1}
    >
      &gt;
    </button>
  </div>
  );
};

export default Swipe;
