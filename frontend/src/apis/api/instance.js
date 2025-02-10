// src/apis/instance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 기본 API 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
