import { useEffect } from "react";
import "../styles/components/GoogleLogin.css";

const GoogleLogin = () => {
    const googleLogin = () => {
<<<<<<< HEAD
        window.location.href = "http://i12d105.p.ssafy.io:8081/user/login";
=======
        // const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?" +
        //     "client_id=" + encodeURIComponent(clientId) +
        //     "&redirect_uri=" + encodeURIComponent(redirectUri) +
        //     "&response_type=token" +
        //     "&scope=email profile";

        // console.log("Google OAuth URL:", googleAuthUrl);

        window.location.href = "hhttp://i12d105.p.ssafy.io:8081/user/login";

>>>>>>> 625f053602fbf0e78b10a4090b239762574e4277
    };

    // useEffect(() => {
    //     // URL이 /oauth/success인 경우에만 토큰 처리
    //     if (window.location.pathname === '/oauth/success') {
    //         // Authorization 헤더에서 토큰 읽기
    //         const accessToken = document.cookie
    //             .split('; ')
    //             .find(row => row.startsWith('access_token='))
    //             ?.split('=')[1];

    //         if (accessToken) {
    //             // 토큰을 localStorage에 저장
    //             localStorage.setItem('access_token', accessToken);
    //             console.log('Access Token received:', accessToken);

    //             // 메인 페이지나 다른 페이지로 리다이렉트
    //             window.location.href = '/';
    //         } else {
    //             console.error('No access token found');
    //         }
    //     }
    // }, []);

    return (
        <button onClick={googleLogin} className="google-button">
            {/* 버튼 내용 */}
        </button>
    );
};

export default GoogleLogin;