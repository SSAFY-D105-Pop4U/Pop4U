import React, { useState, useContext } from "react";
import "../../styles/components/Calendar.css";
import { AppDataContext } from "../../Context.jsx"; // useContext 추가

const Calendar = ({ setResultDate, popupStartDay, popupEndDay }) => {
  const today = new Date();
  const [styear, stmonth, stday] = popupStartDay.split("-").map(Number);
  const [endyear, endmonth, endday] = popupEndDay.split("-").map(Number);

  const startDay = new Date(styear, stmonth-1, stday);
  const endDay = new Date(endyear, endmonth-1, endday);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  // console.log("시간",endyear,endmonth,endday);
  

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
  
    // 클릭한 날짜 객체 생성
    const selectedFullDate = new Date(currentYear, currentMonth, day);
  
    // 선택한 날짜가 시작일과 종료일 사이에 있는지 확인
    const isWithinOpenRange = selectedFullDate >= startDay && selectedFullDate <= endDay;
  
    if (isWithinOpenRange) {
      setSelectedDate(day);
      const dayOfWeek = dayNames[selectedFullDate.getDay()];
      setResultDate(`${currentMonth + 1}월 ${day}일(${dayOfWeek})`);
  
      // useContext에 저장하는 코드
      setAppData((prev) => ({
        ...prev,
        selectedDate: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      })); 
    }
  };
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={handlePrevMonth}>{"<"}</button>
        <span className="month-title">{currentYear}년 {currentMonth + 1}월</span>
        <button className="nav-btn" onClick={handleNextMonth}>{">"}</button>
      </div>

      <div className="day-names">
        {dayNames.map((day) => (
          <div key={day} className="day-name">{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const selectedDateObj = new Date(currentYear, currentMonth, day);
          const isWithinOpenRange = selectedDateObj >= startDay && selectedDateObj <= endDay;

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
