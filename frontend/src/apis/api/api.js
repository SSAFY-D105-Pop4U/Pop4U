// src/apis/popupApi.js
import { ssrExportAllKey } from "vite/module-runner";
import api from "./instance.js";
import { imgapi } from "./instance.js";
import axios from "axios";

{
  /* ✅ post : 회원가입*/
}
export const postsignup = async (formattedData) => {
  try {
    console.log(formattedData);

    const response = await api.post(`/user/join`, formattedData);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

{
  /* ✅ post : 로그인*/
}
export const postlogin = async (loginData) => {
  try {
    console.log(loginData);
    const response = await api.post(`/user/login`, loginData);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

{
  /* ✅ GET : 메인화면 상품 조회 */
}
export const getPopups = async () => {
  try {
    const response = await api.get("/popup");
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

{
  /* ✅ GET : 메인화면 상품 전체 조회 */
}
export const getAllPopups = async () => {
  try {
    const response = await api.get("/popup",{params: { fetchAll: true },});
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

{
  /* ✅ GET : 검색어 조회 */
}
export const getSearch = async (keyword) => {
  try {
    const response = await api.get(`popup/search`, {
      params: { keyword }, // ✅ 자동으로 `popup/search?keyword=캐릭터` 형태로 변환됨
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

{
  /* ✅ GET : 인기 검색어 조회 */
}
export const getSearchRanking = async () => {
  try {
    const response = await api.get("/popup/search/ranking");
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

{
  /* ✅ GET : 팝업 상세 정보 조회*/
}
export const GetPopupDetail = async (popupId) => {
  try {
    const response = await api.get(`/popup/${popupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

{
  /* ✅ GET : 지역별 리뷰 정보 조회*/
}
export const getPopupsRegion = async (popupRegion) => {
  try {
    const response = await api.get(`/popup/region/${popupRegion}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

{
  /* ✅ GET : 리뷰 정보 조회*/
}
export const getReviews = async (popupId) => {
  try {
    const response = await api.get(`/review/${popupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

{
  /* ✅ post : 예약하기*/
}
export const postappointment = async ({
  popupId,
  userId,
  person,
  date,
  time,
}) => {
  try {
    const response = await api.post(`/reservation/${popupId}`, {
      userId: userId, // 사용자 ID
      reservationPeople: person, // 예약 인원
      reservationDate: date, // 예약 날짜
      reservationTime: time, // 예약 시간
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

{
  /* ✅ get : 내예약팝업 리스트*/
}
export const getmyreservation = async () => {
  try {
    const response = await api.get(`/reservation/my`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

// 내예약 조회
export const myreservation = async () => {
  try {
    const response = await api.get(`/reservation/my`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

// 내예약 삭제
export const deleteReservation = async (popupId) => {
  try {
    console.log(popupId);
    
    const response = await imgapi.delete(`/reservation/${popupId}`);
    console.log(response);
    return response.data;
    
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

// post 리뷰작성
export const postwritereview = async (formData) => {
  try {
    // imgapi는 이미 "Content-Type": "multipart/form-data" 설정되어 있다고 가정
    // FormData를 그대로 보냄
    const response = await imgapi.post("/review/create", formData);
    return response.data;
  } catch (error) {
    console.error("Error posting review:", error);
    throw error;
  }
};



 // 팝업 아이콘 가져오기
export const getreviewcheck = async (popupId) => {
  try {
    const response = await api.get(`/four_cuts/${popupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
}


// post 게임 생성
export const postcreategame = async ({ startTime, popupId }) => {
  try {
    const response = await api.post(`/game/start/${popupId}`, {
      startTime,
      popupId,
    });
    console.log("게임생성 api 요청성공")
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

// 게임 생성 시간 조회
export const getstarttime = async (popupId) => {
  try {
    const response = await api.get(`/game/status/${popupId}`)
    console.log("시간 조회 api 완료");
    console.log("게임시작시간: " , response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};

// 게임 10번 클릭시 api 전송
export const postpeople = async ({popupId, userId, timestamp}) => {
  try {
    console.log("게임 완료 API 호출 :", {popupId, userId, timestamp});
    const response = await api.post(`/game/complete`, {
      popupId,
      userId,
      completionTime: timestamp
    });
    console.log("게임 완료 API 응답:", response.data);
    return response.data;
  } catch (error) {
    console.error("게임 완료 API 호출 실패:", error);
    throw error;
  }
};

// get 게임 결과 요청
export const getresult = async (popupId) => {
  try {
    const response = await api.get(`/game/rankings/${popupId}`)
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};









