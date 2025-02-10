import React, { useState } from "react";
import "../../styles/components/Time.css";
import Drag from "../../hooks/Drag";

const Time = ({ selectedTime, setSelectedTime }) => {

     const {
        scrollRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
      } =Drag();

  const time = "1:00 AM - 10:00 PM";

  // 시간을 24시간 형식으로 변환하는 함수
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

  // 시작 시간부터 종료 시간까지의 시간 슬롯 생성 함수
  const generateHourlySlots = (startTime, endTime) => {
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(startTime.hour, startTime.minute, 0);

    const endTimeObj = new Date();
    endTimeObj.setHours(endTime.hour, endTime.minute, 0);

    while (currentTime <= endTimeObj) {
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const meridian = hours >= 12 ? "PM" : "AM";
      const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
      const formattedTime = `${formattedHour}:${minutes.toString().padStart(2, "0")} ${meridian}`;
      slots.push(formattedTime);
      currentTime.setHours(currentTime.getHours() + 1);
    }

    return slots;
  };

  // 시작 시간과 종료 시간 파싱
  const [startTime, endTime] = time.split(" - ");
  const start = convertTo24Hour(startTime);
  const end = convertTo24Hour(endTime);

  // 시간 슬롯 생성
  const times = generateHourlySlots(start, end);
  
  
  
  return (
    <div>
      <div className="time-selector"  ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        {times.map((time) => (
            
          <button
            key={time}
            className={`time-button ${selectedTime === time ? "selected" : ""}`}
            onClick={() => setSelectedTime(time)}
          >
            
            {time}
          </button>
          
        ))}
      </div>
    </div>
  );
};

export default Time;
