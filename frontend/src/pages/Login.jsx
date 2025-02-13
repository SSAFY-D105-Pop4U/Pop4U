import { useState } from "react";
import "../styles/pages/Login.css";
import large_logo from "../assets/images/large_logo.png";
import { useNavigate } from "react-router-dom";
import { getlogin } from "../apis/api/api.js";

const Login = () => {
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

    /// api 호출 따로 빼야함
        const handleLogin = async () => {
            try {
                console.log("회원가입 요청:", login);
                const response = await getlogin(login); // postsignup 함수 호출
    
                if (response) {
                    console.log("회원가입 성공:", response);
                    nav("/login"); // 회원가입 성공 후 이동할 페이지
                }
            } catch (error) {
                console.error("회원가입 실패:", error);
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
