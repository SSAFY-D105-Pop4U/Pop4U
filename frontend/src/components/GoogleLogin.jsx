// import { useEffect } from "react";
// import { getToken } from "../apis/getToken"
// import google from "../assets/images/google.png"
import "../styles/components/GoogleLogin.css"
import "../styles/components/GoogleLogin.css"

const GoogleLogin = () => {
    // 첫 acess_token 받아오기기 (clientId, redirectUri는 env 파일에 넣어서 사용해야함 )
    const googleLogin = () => {
        // const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
        //     "client_id=" + encodeURIComponent(clientId) +
        //     "&redirect_uri=" + encodeURIComponent(redirectUri) +
        //     "&response_type=token" +
        //     "&scope=email profile";

        // console.log("Google OAuth URL:", googleAuthUrl);

        window.location.href = "http://localhost:8080/user/login";

    };
    return (
        <button onClick={googleLogin} className="google-button">
        </button>
    );
    
    //엑세스 토큰 받아오면 저장하기
    // useEffect(() => {
    //     const getAccessTokenFromUrl = () => {
    //         const hashParams = new URLSearchParams(window.location.hash.substring(1));
    //         return hashParams.get("access_token");
    //     };

    
    // //백엔드로 accessToken 전송
    //     const accessToken = getAccessTokenFromUrl();
    //     if (accessToken) {
    //         console.log("Access Token:", accessToken);
    //         getToken(accessToken)
    //             .then((data) => console.log("유저 정보:", data))
    //             .catch((error) => console.error("API 호출 오류:", error));

    //         //  URL 정리 (access_token 삭제)
    //         window.history.replaceState({}, document.title, window.location.pathname);

    //     }
    // }, []);

};

export default GoogleLogin;
