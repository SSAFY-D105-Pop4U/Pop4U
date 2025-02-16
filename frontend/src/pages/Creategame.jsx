import React, { useState, useEffect } from "react";
import { postcreategame } from "../apis/api/api.js";
import {useNavigate, useSearchParams } from "react-router-dom";

const HourlyDial = () => {
  const [selectedTime, setSelectedTime] = useState({ hours: 12, minutes: 0 });
  const [searchParams] = useSearchParams();
  const popupId = searchParams.get("popupId");

  useEffect(() => {
    const handleScroll = (e, type) => {
      const container = e.target;
      const itemHeight = 32;
      const middleIndex = Math.round(
        container.scrollTop / itemHeight + container.clientHeight / (2 * itemHeight)
      );

      setSelectedTime((prev) => ({
        ...prev,
        [type]: middleIndex,
      }));
    };

    document.getElementById("hour-container").addEventListener("scroll", (e) => handleScroll(e, "hours"));
    document.getElementById("minute-container").addEventListener("scroll", (e) => handleScroll(e, "minutes"));

    return () => {
      document.getElementById("hour-container").removeEventListener("scroll", (e) => handleScroll(e, "hours"));
      document.getElementById("minute-container").removeEventListener("scroll", (e) => handleScroll(e, "minutes"));
    };
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // api 요청임✅
  const handleSubmit = async () => {
    const formattedTime = {
      date: getCurrentDate(),
      hours: selectedTime.hours.toString().padStart(2, "0"),
      minutes: selectedTime.minutes.toString().padStart(2, "0"),
    };
  
    // `startTime` 형식 변환
    const startTime = `${formattedTime.date}T${formattedTime.hours}:${formattedTime.minutes}:00`;
  
    console.log(startTime); // 예: "2025-02-15T14:00:00"
  
    try {
      const data = await postcreategame({startTime,popupId});
      console.log("API 응답 (게임생성):", data);
    } catch (error) {
      console.error("api 호출 실패(게임생성)", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>시간 설정</h2>
      <div style={styles.dialWrapper}>
        <div id="hour-container" style={styles.dialContainer}>
          {[...Array(25).keys()].map((hour) => (
            <div
              key={hour}
              style={{
                ...styles.dialItem,
                fontWeight: hour === selectedTime.hours ? "bold" : "normal",
                color: hour === selectedTime.hours ? "#007bff" : "black",
              }}
            >
              {hour.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
        <div id="minute-container" style={styles.dialContainer}>
          {[...Array(60).keys()].map((minute) => (
            <div
              key={minute}
              style={{
                ...styles.dialItem,
                fontWeight: minute === selectedTime.minutes ? "bold" : "normal",
                color: minute === selectedTime.minutes ? "#007bff" : "black",
              }}
            >
              {minute.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>
      <p>
        선택한 시간: <strong>{selectedTime.hours.toString().padStart(2, "0")}:{selectedTime.minutes.toString().padStart(2, "0")}</strong>
      </p>
      <button onClick={handleSubmit} style={styles.button}>만들기</button>
    </div>
  );
};

const styles = {
  container: {
    width: "350px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  dialWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginBottom: "10px",
  },
  dialContainer: {
    height: "160px",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    width: "80px",
    scrollSnapType: "y mandatory",
  },
  dialItem: {
    padding: "8px 0",
    cursor: "pointer",
    fontSize: "18px",
    transition: "color 0.2s, transform 0.2s",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    scrollSnapAlign: "center",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default HourlyDial;
