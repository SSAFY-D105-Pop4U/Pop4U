import { createContext, useState, useEffect } from "react";

// Context 생성
export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  // 1) 세션 스토리지에서 userId 초기값 가져오기 (없으면 null)
  const storedUserId = sessionStorage.getItem("userId");

  // 2) Context의 기본 상태 정의 (userId를 storedUserId로 초기화)
  const [appData, setAppData] = useState({
    Token: null,
    userId: storedUserId || null, // 세션 스토리지 값 혹은 null
    isAuthenticated: false,
    selectedDate: null,
    selectedTime: null,
    selectedPerson: null,
    reservationStatus: null,
    popupName: null,
    popupId: null,
  });

  // 3) userId가 바뀔 때마다 sessionStorage에도 저장
  useEffect(() => {
    if (appData.userId) {
      sessionStorage.setItem("userId", appData.userId);
    } else {
      sessionStorage.removeItem("userId"); 
    }
  }, [appData.userId]);

  return (
    <AppDataContext.Provider value={{ appData, setAppData }}>
      {children}
    </AppDataContext.Provider>
  );
};
