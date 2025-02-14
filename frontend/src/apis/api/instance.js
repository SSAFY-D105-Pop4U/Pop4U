// src/apis/instance.js
import axios from "axios";

const token = sessionStorage.getItem("accessToken"); 

const api = axios.create({
    // baseURL: "/api",
    baseURL: "http://localhost:8081/",

    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `${token}` : "", 
    },
  });

// api.interceptors.request.use(
//     (config) => {
//       const token = sessionStorage.getItem("accessToken"); // sessionStorage에서 토큰 가져오기
//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
//         console.log(token)
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
    
//   );

// 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // 리프레시 토큰으로 새로운 액세스 토큰 요청
            try {
                const response = await api.post('/api/auth/refresh');
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('access_token', newAccessToken);
                
                // 실패했던 요청 재시도
                const originalRequest = error.config;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // 리프레시 토큰도 만료된 경우
                localStorage.removeItem('access_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default api;
