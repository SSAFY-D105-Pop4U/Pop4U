import { useEffect } from "react";
import "../styles/components/GoogleLogin.css";

const GoogleLogin = () => {
    const googleLogin = () => {
        window.location.href = "http://i12d105.p.ssafy.io:8081/user/login";
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