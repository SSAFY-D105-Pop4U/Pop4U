import React, { useState, useContext } from "react";
import "../../styles/components/Calendar.css";
import { AppDataContext } from "../../Context.jsx"; // useContext 추가

const Calendar = ({ setResultDate }) => {
  const today = new Date();
  const startDay = new Date(2025, 2, 11);
  const endDay = new Date(2025, 2, 18);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const { setAppData } = useContext(AppDataContext); // useContext 사용

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const firstDayWeekIndex = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const calendarDays = [];
  for (let i = 0; i < firstDayWeekIndex; i++) {
    calendarDays.push("");
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const handleDateClick = (day) => {
    if (!day) return;

    const isWithinOpenRange =
      day >= startDay.getDate() &&
      currentMonth >= startDay.getMonth() - 1 &&
      currentYear >= startDay.getFullYear() &&
      day <= endDay.getDate() &&
      currentMonth <= endDay.getMonth() - 1 &&
      currentYear <= endDay.getFullYear();

    if (isWithinOpenRange) {
      setSelectedDate(day);

      const selectedFullDate = new Date(currentYear, currentMonth, day);
      const dayOfWeek = dayNames[selectedFullDate.getDay()];
      setResultDate(`${currentMonth + 1}월 ${day}일(${dayOfWeek})`);

      // useContext에 저장하는 코드드
      setAppData((prev) => ({
        ...prev,
        selectedDate: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      })); 
    }
  };
  return (
    <div className="calendar-container">
      <div className="calendar-header">

      <button className="nav-btn" onClick={handlePrevMonth}>
            {"<"}
          </button>
        <span className="month-title">
          {currentYear}년 {currentMonth + 1}월
        </span>
        <div>
          
          <button className="nav-btn" onClick={handleNextMonth}>
            {">"}
          </button>
        </div>
      </div>

      <div className="day-names">
        {dayNames.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const isWithinOpenRange =
            day >= startDay.getDate() &&
            currentMonth >= startDay.getMonth() - 1 &&
            currentYear >= startDay.getFullYear() &&
            day <= endDay.getDate() &&
            currentMonth <= endDay.getMonth() - 1 &&
            currentYear <= endDay.getFullYear();

          return (
            <div
              key={index}
              className={`day ${day ? "" : "empty"} 
                ${isWithinOpenRange ? "open" : ""}
                ${selectedDate === day ? "selected" : ""}`}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
