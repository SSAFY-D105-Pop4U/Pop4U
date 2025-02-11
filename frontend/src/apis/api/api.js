// src/apis/popupApi.js
import api from "./instance.js";


{/* ✅ GET : 메인화면 상품 조회 */}
export const getPopups = async () => {
    try {
      const response = await apiInstance.get("/popup");
      return response.data;
    } catch (error) {
      console.error("Error fetching popups:", error);
      throw error;
    }
}

{/* ✅ GET : 팝업 상세 정보 조회*/}
export const GetPopupDetail = async (popupId) => {
  try {
    const response = await apiInstance.get(`/popup/${popupId}`);
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
    const response = await apiInstance.get(`/review/${popupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popups:", error);
    throw error;
  }
}

export const postappointment = async (popupId) => {
  try {
    const response = await apiInstance.post(`/reservation/${popupId}`,);
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
