import React, { useContext, useEffect } from "react";
import ProgressBar from "../components/appointment/ProgressBar";
import Header from "../components/basic/Header";
import Recheck from "../components/appointment/Recheck";
import { useSearchParams } from "react-router-dom";
import { postappointment } from "../apis/api/api.js";
import { AppDataContext } from "../Context.jsx";

const Appointment = () => {
  const { appData } = useContext(AppDataContext); 
  const [searchParams] = useSearchParams();
  const popupName = searchParams.get("popupName");
  const popupId = searchParams.get("popupId");

  useEffect(() => {
    console.log("📦 Context 데이터 현황:", appData);
  }, [appData]);  // ✅ appData 전체가 변경될 때마다 실행됨

  const userId = 1; // 샘플 userId
  const appointment = async () => {
    try {
      const data = await postappointment({
        popupId,
        userId,
        person: appData.selectedPerson,
        date: appData.selectedDate,
        time: appData.selectedTime,
      });
      console.log("API 응답 (팝업상세):", data);
    } catch (error) {
      console.error("API 호출 실패");
    }
  };

  return (
    <div>
      <Header title="방문 예약" />
      <ProgressBar showAppointmentDetails={false} />
      <h3>
        예약 정보를 다시 한 번<br />
        확인해주세요.
      </h3>
      <Recheck
        name={popupName}
        date={appData.selectedDate} // ✅ 전역 상태에서 선택한 날짜 사용
        people={appData.selectedPerson}
        title={appData.selectedTime}
      />
      <button onClick={appointment} className="okbutton">확인</button>
    </div>
  );
};

export default Appointment;
