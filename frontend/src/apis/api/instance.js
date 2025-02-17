// src/apis/instance.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8081/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const imgapi = axios.create({
    baseURL: "/api",
    withCredentials: true,
    // headers: {
    //     "Content-Type": "multipart/form-data",
    // },
});

imgapi.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("accessToken"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("❌ API 요청 시 토큰이 없습니다.");
        }
        return config;
    },
    (error) => Promise.reject(error)
);


// ✅ 요청 인터셉터 (요청 시점마다 최신 토큰 가져오기)
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("accessToken"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("❌ API 요청 시 토큰이 없습니다.");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
