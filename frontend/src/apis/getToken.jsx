import axios from "axios";

export const getToken = async (accessToken) => {
    try {
        const response = await axios.post("restapi 주소소", {
            access_token: accessToken
        });
        console.log("백엔드 응답:", response.data);
        return response.data; // 필요하면 응답 데이터를 반환
    } catch (error) {
        console.error("백엔드 요청 오류:", error);
        throw error;
    }
};
