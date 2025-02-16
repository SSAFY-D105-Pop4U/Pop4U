import React, { useState, useEffect } from "react";
import { postcreategame } from "../apis/api/api.js";
import { useSearchParams } from "react-router-dom";

const Creategame = () => {
  const [selectedTime, setSelectedTime] = useState({ hours: 12, minutes: 0 });
  const [searchParams] = useSearchParams();
  const popupId = searchParams.get("popupId");

  // ✅ 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameLink, setGameLink] = useState("");

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

  // ✅ API 요청 및 모달 열기
  const handleSubmit = async () => {
    setIsModalOpen(true); // 모달 열기

    const formattedTime = {
      date: getCurrentDate(),
      hours: selectedTime.hours.toString().padStart(2, "0"),
      minutes: selectedTime.minutes.toString().padStart(2, "0"),
    };
    
    const startTime = `${formattedTime.date}T${formattedTime.hours}:${formattedTime.minutes}:00`;

    console.log("전송 데이터:", { startTime, popupId });

    try {
      const data = await postcreategame({ startTime, popupId });
      console.log("API 응답 (게임생성):", data);
      setIsModalOpen(true); // 모달 열기
      
    } catch (error) {
      console.error("API 호출 실패(게임생성)", error);
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
      <button onClick={handleSubmit} style={styles.button}>게임 만들기</button>



      {/* ✅ 모달 */}
      {isModalOpen && (
  <div style={styles.modalOverlay}>
    <div style={styles.modalContent}>
      <h2>게임 링크</h2>
      
      {/* ✅ URL을 복사할 수 있도록 버튼 추가 */}
      <div style={styles.copyContainer}>
        <input
          type="text"
          value={`https://i12d105.p.ssafy.io/game/Event_Game/${popupId}`}
          readOnly
          style={styles.copyInput}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(`https://i12d105.p.ssafy.io/game/Event_Game/${popupId}`);
            alert("링크가 복사되었습니다!");
          }}
          style={styles.copyButton}
        >
          복사
        </button>
      </div>

      <a href={gameLink} target="_blank" rel="noopener noreferrer">
        {gameLink}
      </a>
      <br />
      <button onClick={() => setIsModalOpen(false)} style={styles.modalCloseBtn}>
        닫기
      </button>
    </div>
  </div>
)}

    </div>
  );
};

const styles = {
  
  copyContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  copyInput: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    textAlign: "center",
  },
  copyButton: {
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "14px",
  },
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
  /* ✅ 모달 스타일 */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "white",
    padding: "20px",
    width: "350px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  modalCloseBtn: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default Creategame;
