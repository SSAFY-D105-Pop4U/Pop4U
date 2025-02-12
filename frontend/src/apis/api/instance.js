// src/apis/instance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://i12d105.p.ssafy.io:8081", // 기본 API 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
