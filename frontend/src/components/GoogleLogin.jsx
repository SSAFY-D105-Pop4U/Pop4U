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

        window.location.href = "hhttp://i12d105.p.ssafy.io:8081/user/login";

    };
    return (
        <button onClick={googleLogin} className="google-button">
        </button>
    );
    
    //엑세스 토큰 받아오면 저장하기 

};

export default GoogleLogin;
