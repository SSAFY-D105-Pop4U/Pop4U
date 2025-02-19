import { useState, useRef, useEffect } from "react";
import "../styles/pages/Signup.css";
import large_logo from "../assets/images/large_logo.png";
import { useNavigate } from "react-router-dom";
import { postsignup } from "../apis/api/api";
import {postlogin} from "../apis/api/api.js"



const Signup = () => {
    const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        name: "",
        phone: "",
        type: 0 // 0: 일반회원, 1: 관리자
    });
    useEffect(() => {
        console.log("formData.type 상태:", formData.type);
    }, [formData.type]);
    
    const passwordCheckRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const selectedType = Number(e.target.value);
    
        setFormData((prev) => ({
            ...prev,
            type: prev.type === selectedType ? 0 : selectedType // 기본값을 0으로 설정하여 항상 체크박스가 유지됨
        }));
    };

    const handleLogin = async () => {
        try {
          const loginData = {
            email: formData.id,
            password: formData.password,
          };
          console.log("로그인 요청:", loginData);
          const response = await postlogin(loginData);
          if (response && response.data && response.data.accessToken) {
            console.log("로그인 성공:", response);
            // 최신 토큰을 저장
            sessionStorage.setItem("accessToken", response.data.accessToken);
            setToken(response.data.accessToken); // useState의 토큰도 업데이트
            sessionStorage.setItem("userId", response.data.userId);
            nav("/usercategory");

          }
        } catch (error) {
          console.error("로그인 실패:", error);
        }
      };

    const nav = useNavigate()
    // 회원가입 요청
    const handleSignup = async () => {
        try {
            const formattedData = {
                userEmail: formData.id,        
                userPassword: formData.password, 
                userName: formData.name,       
                userTelephone: formData.phone,  
                userStatus: formData.type          
            };
            console.log("회원가입 요청:", formattedData);
            const response = await postsignup(formattedData); // postsignup 함수 호출

            if (response ) {
                console.log("회원가입 성공:", response);
                handleLogin()
            }
        } catch (error) {
            console.error("회원가입 실패:", error);
        }
    }
    return (
        <div className="signup-container">
            <div className="signup-box">
                <img src={large_logo} alt="Logo" className="login-logo" />
                <input
                    type="text"
                    name="id"
                    placeholder="아이디 입력해 주세요."
                    className="input-field"
                    value={formData.id}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해 주세요."
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="passwordCheck"
                    placeholder="비밀번호를 재입력 해주세요."
                    className="input-field"
                    ref={passwordCheckRef}
                />

                <input
                    type="text"
                    name="name"
                    placeholder="이름을 입력해 주세요."
                    className="input-field"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="전화번호를 입력해 주세요."
                    className="input-field"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <div className="checkbox">
                    <div className="user">
                        <input 
                            type="checkbox" 
                            id="user" 
                            value={0} 
                            checked={formData.type === 0}
                            onChange={handleCheckboxChange} 
                        />
                        <label htmlFor="user">일반회원</label>
                    </div>
                    <div className="manager">
                        <input 
                            type="checkbox" 
                            id="manager" 
                            value={1} 
                            checked={formData.type === 1}
                            onChange={handleCheckboxChange} 
                        />
                        <label htmlFor="manager">관리자</label>
                    </div>
                </div>                

                <button className="signup-button" onClick={handleSignup}>
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default Signup;
