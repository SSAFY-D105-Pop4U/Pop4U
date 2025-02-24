import React, { useContext } from "react";
import "../../styles/components/Time.css";
import Drag from "../../hooks/Drag";
import { AppDataContext } from "../../Context.jsx"; // useContext 추가

const Time = ({ selectedTime, setSelectedTime }) => {
  const { setAppData } = useContext(AppDataContext); // Context 사용

  const {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = Drag();

  const time = "10:00 AM - 6:00 PM";

  const convertTo24Hour = (timeStr) => {
    const [time, meridian] = timeStr.split(" ");
    let [hour, minute] = time.split(":").map(Number);

    if (meridian === "PM" && hour !== 12) {
      hour += 12;
    }
    if (meridian === "AM" && hour === 12) {
      hour = 0;
    }

    return { hour, minute };
  };

  const generateHourlySlots = (startTime, endTime) => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(startTime.hour, startTime.minute, 0);

    const endTimeObj = new Date();
    endTimeObj.setHours(endTime.hour, endTime.minute, 0);

    while (currentTime <= endTimeObj) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      slots.push(formattedTime);
      currentTime.setHours(currentTime.getHours() + 1);
    }

    return slots;
  };

  const [startTime, endTime] = time.split(" - ");
  const start = convertTo24Hour(startTime);
  const end = convertTo24Hour(endTime);

  const times = generateHourlySlots(start, end);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);

    setAppData((prev) => ({
      ...prev,
      selectedTime: time, // Context에 24시간 형식(HH:MM)으로 저장
    }));
  };

  return (
    <div style={{width:"100%"}}>
      <div
        className="time-selector"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {times.map((time) => (
          <button
            key={time}
            className={`time-button ${selectedTime === time ? "selected" : ""}`}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Time;
