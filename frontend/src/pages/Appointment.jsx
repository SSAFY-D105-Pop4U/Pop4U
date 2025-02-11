import React, { useContext, useState, useEffect } from "react";
import Calendar from "../components/appointment/Calendar";
import PersonSelector from "../components/appointment/PersonSelector";
import ProgressBar from "../components/appointment/ProgressBar";
import Header from "../components/basic/Header";
import Time from "../components/appointment/Time";
import NextButton from "../components/NextButton";
// import Recheck from "../components/appointment/Recheck";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postappointment } from "../apis/api/api.js";
import { AppDataContext } from "../Context.jsx";

const Appointment = () => {
  const nav = useNavigate();
  const { appData, setAppData } = useContext(AppDataContext);
  const [selectedDate, setSelectedDate] = useState(""); // ✅ 추가: 선택한 날짜 상태
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(true);

  const [searchParams] = useSearchParams();
  const popupName = searchParams.get("popupName");
  const popupId = searchParams.get("popupId");
  const [userId, setUserId] = useState(1); //샘플 userId
  useEffect(() => {
    console.log("📦 Context 데이터 현황황:", appData);
  }, [appData]); // ✅ appData 전체가 변경될 때마다 실행됨

  const appointment = async () => {
    try {
      console.log(userId);
      const data = await postappointment({
        popupId,
        userId,
        person: appData.selectedPerson,
        date: appData.selectedDate,
        time: appData.selectedTime,
      });
      console.log("API 응답 (팝업상세):", data);
      nav("/recheck");
    } catch (error) {
      console.error("api 호출 실패");
    }
  };

  return (
    <div>
      <Header title="방문 예약" />
      <ProgressBar showAppointmentDetails={showAppointmentDetails} />
      {showAppointmentDetails ? (
        <>
          <Calendar setResultDate={setSelectedDate} />{" "}
          {/* ✅ setResultDate를 전달 */}
          <PersonSelector
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
          />
          <Time selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          <NextButton onClick={appointment}>다음</NextButton>
        </>
      ) : (
        <>
          <h3>
            예약 정보를 다시 한 번<br />
            확인해주세요.
          </h3>
          <Recheck
            name={popupName}
            date={appData.selectedDate} // ✅ 전역 상태에서 선택한 날짜 사용
            people={selectedPerson}
            title={selectedTime}
          />
        </>
      )}
    </div>
  );
};

export default Appointment;
