// src/apis/instance.js
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://192.168.100.130:8080", // 기본 API 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;
