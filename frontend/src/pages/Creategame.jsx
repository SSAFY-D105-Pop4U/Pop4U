import React, { useState } from "react";
import { postcreategame } from "../apis/api/api.js";
import { useSearchParams } from "react-router-dom";

const Creategame = () => {
  const [searchParams] = useSearchParams();
  const popupId = searchParams.get("popupId");

  // ✅ 시간 입력 상태
  const [selectedTime, setSelectedTime] = useState("12:00");

  // ✅ 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      time: selectedTime,
    };

    const startTime = `${formattedTime.date}T${formattedTime.time}:00`;

    console.log("전송 데이터:", { startTime, popupId });
    sessionStorage.setItem("startTime", startTime);

    try {
      const data = await postcreategame({ startTime, popupId });
      setIsModalOpen(true); // 모달 열기
    } catch (error) {
      console.error("API 호출 실패(게임생성)", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>시간 설정</h2>

      {/* ✅ 직접 입력하는 시간 선택 */}
      <input
        type="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        style={styles.timeInput}
      />
    <br>
    </br>
      {/* <p>
        선택한 시간: <strong>{selectedTime}</strong>
      </p> */}

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
  /* ✅ 직접 입력하는 시간 입력창 스타일 */
  timeInput: {
    fontSize: "18px",
    padding: "8px",
    margin: "10px 0",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "150px",
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
};

export default Creategame;
