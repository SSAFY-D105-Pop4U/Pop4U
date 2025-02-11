import React, { useContext, useEffect } from "react";
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
  }, []);  // ✅ appData 전체가 변경될 때마다 실행됨
};
return (
  <div>
    <Recheck
      name={popupName}
      date={appData.selectedDate} // ✅ 전역 상태에서 선택한 날짜 사용
      people={appData.selectedPerson}
      title={appData.selectedTime}
    />
  </div>
);

export default Appointment;
