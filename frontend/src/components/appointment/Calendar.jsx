import React, { useState } from "react";
import "../../styles/components/Calendar.css";

const Calendar = ({ resultDate, setResultDate }) => {
  const today = new Date();

  const startDay = new Date(2025, 2, 11);
  const endDay = new Date(2025, 2, 15);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태 추가

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 배열

  // 현재 월의 첫 날과 마지막 날 계산
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
    setSelectedDate(null); // 달 변경 시 선택 초기화
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null); // 달 변경 시 선택 초기화
  };

  // 날짜 배열 생성
  const calendarDays = [];
  for (let i = 0; i < firstDayWeekIndex; i++) {
    calendarDays.push("");
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // 날짜 클릭 핸들러
  const handleDateClick = (day) => {
    if (!day) return; // 빈 날짜 클릭 방지

    // open된 날짜만 선택 가능하도록 설정
    const isWithinOpenRange =
      day >= startDay.getDate() &&
      currentMonth >= startDay.getMonth() - 1 &&
      currentYear >= startDay.getFullYear() &&
      day <= endDay.getDate() &&
      currentMonth <= endDay.getMonth() - 1 &&
      currentYear <= endDay.getFullYear();

    if (isWithinOpenRange) {
      setSelectedDate(day);

      // 선택된 날짜를 기반으로 요일 계산
      const selectedFullDate = new Date(currentYear, currentMonth, day);
      const dayOfWeek = dayNames[selectedFullDate.getDay()]; // 요일 가져오기

      setResultDate(`${currentMonth + 1}월 ${day}일(${dayOfWeek})`);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <span className="month-title">
          {currentYear}년 {currentMonth + 1}월
        </span>
        <div>
          <button className="nav-btn" onClick={handlePrevMonth}>
            {"<"}
          </button>
          <button className="nav-btn" onClick={handleNextMonth}>
            {">"}
          </button>
        </div>
      </div>

      <div className="day-names">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
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
