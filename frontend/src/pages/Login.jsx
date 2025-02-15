import { useState } from "react";
import "../styles/pages/Login.css";
import large_logo from "../assets/images/large_logo.png";
import { useNavigate } from "react-router-dom";
import { postlogin } from "../apis/api/api.js";
import { useContext } from "react";
import { AppDataContext } from "../Context.jsx";


const Login = () => {
    const [token, setToken] = useState(localStorage.getItem("accessToken") || ""); 
    const { appData, setAppData } = useContext(AppDataContext);
    const nav = useNavigate()
    const [login, setlogin] = useState({
        userid: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setlogin((prev) => ({
            ...prev,
            [name]: value
        }));
    };

        //api 호출
        const handleLogin = async () => {
            try {
                const loginData = {
                    email: login.userid,       
                    password: login.password 
                };
                console.log("로그인 요청:", loginData);
                const response = await postlogin(loginData); 
        
                if (response && response.data && response.data.accessToken) {
                    console.log("로그인 성공:", response);
                    
                    // 최신 토큰을 저장
                    sessionStorage.setItem("accessToken", response.data.accessToken);
                    setToken(response.data.accessToken); // useState의 토큰도 업데이트

                    sessionStorage.setItem("userId" , response.data.userId)

                    // // Context에도 반영
                    // setAppData((prev) => ({  
                    //     ...prev,
                    //     userId: response.data.userId, 
                    //     Token: response.data.accessToken  
                    // }));
                    nav("/home"); // 로그인 성공 후 이동
                }
            } catch (error) {
                console.error("로그인 실패:", error);
            }
        }
        
    

    return (
        <div className="login-container">
            {/* 로그인 폼 */}
            <div className="login-box">
                <img src={large_logo} alt="Logo" className="login-logo" />

                <div className="input-box">
                    <input
                        type="text"
                        name="userid"
                        placeholder="아이디를 입력해 주세요."
                        className="input-field"
                        value={login.userid}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력해 주세요."
                        className="input-field"
                        value={login.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="remember-section">
                    <input type="checkbox" id="remember" className="checkbox" />
                    <label htmlFor="remember" className="remember-text">아이디 기억하기</label>
                    <span className="find-info">아이디/비밀번호 찾기</span>
                </div>

                <button className="login-button" onClick={handleLogin}>로그인</button>

                <div className="signup-section">
                    <span className="signup-text">아직 회원이 아니신가요? </span>
                    <span className="signup-link" onClick={() => nav("/signup")}>회원가입</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
