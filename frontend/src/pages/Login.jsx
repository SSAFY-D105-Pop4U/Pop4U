import React from "react";
import "../styles/pages/Login.css";
import large_logo from "../assets/images/large_logo.png"

const Login = () => {
    return (
        <div className="login-container">
            {/* 로그인 폼 */}
            <div className="login-box">
                <img src={large_logo} alt="Logo" className="login-logo" />

                <div className="input-box">
                    <input type="text" placeholder=" 아이디를 입력해 주세요." className="input-field" />
                </div>

                <div className="input-box">
                    <input type="password" placeholder=" 비밀번호를 입력해 주세요." className="input-field" />
                </div>

                <div className="remember-section">
                    <input type="checkbox" id="remember" className="checkbox" />
                    <label htmlFor="remember" className="remember-text">아이디 기억하기</label>
                    <span className="find-info">아이디/비밀번호 찾기</span>
                </div>

                <button className="login-button">로그인</button>

                <div className="signup-section">
                    <span className="signup-text">아직 회원이 아니신가요? </span>
                    <span className="signup-link">회원가입</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
