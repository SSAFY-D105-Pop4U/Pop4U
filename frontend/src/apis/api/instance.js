import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:8080", // 기본 API 주소
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ 쿠키 및 인증 정보 포함 설정 추가
});

export default apiInstance;
