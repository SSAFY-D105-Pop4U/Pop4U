import React, { useContext, useState, useEffect } from "react";
import Calendar from "../components/appointment/Calendar";
import PersonSelector from "../components/appointment/PersonSelector";
import ProgressBar from "../components/appointment/ProgressBar";
import Header from "../components/basic/Header";
import Time from "../components/appointment/Time";
import NextButton from "../components/NextButton";
// import Recheck from "../components/appointment/Recheck";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppDataContext } from "../Context.jsx";
import "./Appointment.css";

const Appointment = () => {
  const nav = useNavigate();
  const { appData, setAppData } = useContext(AppDataContext);
  const [selectedDate, setSelectedDate] = useState(""); 
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(true);

  const [searchParams] = useSearchParams();
  const popupName = searchParams.get("popupName");
  const popupId = searchParams.get("popupId");
  // const [userId, setUserId] = useState(1); //샘플 userId
  const [userId, setUserId] = useState(appData.userId); // appData에서 사용자 ID 가져오기
  
  useEffect(() => {
    console.log("⭐Context 데이터⭐", appData);
  }, [appData]); 

  return (
    <div style={{ width: "100%", maxWidth: "960px", margin: "0 auto" }}>
      <Header title="방문 예약" />
      <ProgressBar showAppointmentDetails={showAppointmentDetails} />
      <div className="appointment-container">
      <div className="appointment-section appointment-left-section">
          <Calendar setResultDate={selectedDate} />
        </div>
        <div className="appointment-section appointment-right-section">
         
          <div className="desktop-appoint-name" style={{color:"white", marginBottom:"18px", fontSize:"22px", fontWeight:"bold", lineHeight:"30px"}}>{popupName}</div>
          <h2 className="appoint-title">
          인원
          </h2>
          <PersonSelector
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
          />
          <h2 className="appoint-title">
          시간
          </h2>
          <Time selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          <div className="desktop-appoint-but" onClick={()=>nav("/recheck")}>
            다음
          </div>
          <div className="mobile-appoint-but">
            <NextButton onClick={()=>nav("/recheck")}>다음</NextButton>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Appointment;
