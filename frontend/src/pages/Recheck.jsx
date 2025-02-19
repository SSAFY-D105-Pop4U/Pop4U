import React, { useContext } from "react";
import "../styles/pages/Recheck.css";
import Header from "../components/basic/Header";
import ProgressBar from "../components/appointment/ProgressBar";
import NextButton from "../components/NextButton";
import { useNavigate } from "react-router-dom";
import { AppDataContext } from "../Context.jsx";
import { postappointment } from "../apis/api/api.js";

const Recheck = () => {
  const { appData, setAppData } = useContext(AppDataContext);
  const userId = sessionStorage.getItem("userId")


  const nav = useNavigate(); 

  const appointment = async () => {
    try {
      const data = await postappointment({
        popupId: appData.popupId, 
        userId: userId,
        person: appData.selectedPerson,
        date: appData.selectedDate,
        time: appData.selectedTime?.toString() || "시간 미선택", 
      });
      console.log("API 응답 (예약완료):", data);
      nav("/reservation"); 
    } catch (error) {
      console.error("api 호출 실패", error);
    }
  };

  return (
    <div>
      <Header title="방문 예약" />
      <ProgressBar showAppointmentDetails={false} />
      <div className="recheck-text-contain">
        <h3 className="recheck-text">
          예약 정보를 다시 한 번<br />
          확인해주세요.
        </h3>

      </div>
     

      <div className="recheck-container">
        <div className="recheck-item">
          <span className="recheck-label">팝업명</span>
          <span className="recheck-value">
            {appData.popupName || "팝업 이름 없음"} 
          </span>
        </div>
        <div className="recheck-item">
          <span className="recheck-label">인원</span>
          <span className="recheck-value">
            {appData.selectedPerson ? `${appData.selectedPerson}명` : "인원 미선택"}
          </span>
        </div>
        <div className="recheck-item">
          <span className="recheck-label">날짜</span>
          <span className="recheck-value">
            {appData.selectedDate || "날짜 미선택"} 
          </span>
        </div>
        <div className="recheck-item">
          <span className="recheck-label">시간</span>
          <span className="recheck-value">
            {appData.selectedTime ? String(appData.selectedTime) : "시간 미선택"}
          </span>
        </div>
      </div>

      <NextButton onClick={appointment}>확정</NextButton>
    </div>
  );
};

export default Recheck;
