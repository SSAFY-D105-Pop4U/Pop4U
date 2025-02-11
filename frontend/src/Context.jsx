import { createContext, useState } from "react";

// Context 생성
export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
    
  const [appData, setAppData] = useState({
    userid: null,           // 로그인한 사용자 id
    isAuthenticated: false, // 로그인 상태 여부
    selectedDate: null,     // 선택된 날짜
    selectedTime: null,     // 선택된 시간
    selectedPerson: null,   // 예약 사람수
    reservationStatus: null // 예약 상태
  });

  return (
    <AppDataContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppDataContext.Provider>
  );
};
