// src/apis/popupApi.js
import api from "./instance.js";


{/* ✅ GET : 메인화면 상품 조회 */}
export const getPopups = async () => {
    try {
      const response = await api.get("/popup");
      return response.data;
    } catch (error) {
      console.error("Error fetching popups:", error);
      throw error;
    }
}


{/* ✅ GET : 인기 검색어 조회 */}
export const getSearchRanking = async () => {
  try {
    const response = await api.get("/popup/search/ranking");
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
}

{/* ✅ GET : 팝업 상세 정보 조회*/}
export const GetPopupDetail = async (popupId) => {
  try {
    const response = await api.get(`/popup/${popupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
}

{/* ✅ GET : 지역별 리뷰 정보 조회*/}
export const getPopupsRegion = async (popupRegion) => {
  try {
    const response = await api.get(`/popup/region/${popupRegion}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
}

{/* ✅ GET : 리뷰 정보 조회*/}
export const getReviews = async (popupId) => {
  try {
    const response = await api.get(`/review/${popupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
}

{/* ✅ post : 예약하기*/}
export const postappointment = async ({ popupId, userId, person, date, time }) => {
  try {
    const response = await api.post(`/reservation/${popupId}`, {
      userId: userId,          // 사용자 ID
      reservationPeople: person, // 예약 인원
      reservationDate: date,  // 예약 날짜
      reservationTime: time   // 예약 시간
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
};


{/* ✅ ??? : 내예약확인*/}
export const getmyreservation = async () => {
  try {
    const response = await api.get(`/reservation/my`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
}

{/* ✅  get : 팝업정보 불러오기*/}
export const getpopup = async () => {
  try {
    const response = await api.get(`/reservation/my`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
}


{/* ✅ ??? : 회원가입*/}
export const postsignup = async (formattedData) => {
  try {
    console.log(formattedData)
    
    const response = await api.post(`/user/join`,formattedData);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
}

{/* ✅ ??? : 로그인*/}
export const postlogin = async (loginData) => {
  try {
    console.log(loginData)
    const response = await api.post(`/user/login`,loginData)
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
}






// import axios from "axios";

// export const getToken = async (accessToken) => {
//   try {
//     const response = await axios.post("restapi 주소소", {
//       access_token: accessToken,
//     });
//     console.log("백엔드 응답:", response.data);
//     return response.data; // 필요하면 응답 데이터를 반환
//   } catch (error) {
//     console.error("백엔드 요청 오류:", error);
//     throw error;
//   }
// };

// export const getReviews = async (popupId) => {
//   try {
//     const response = await axios.get(`/api/reviews?popupId=${popupId}`);
//     return response.data;
//   } catch (error) {
//     console.error("리뷰 데이터를 불러오지 못했습니다.", error);
//     return [];
//   }
// };
