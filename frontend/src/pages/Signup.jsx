import { useState, useRef } from "react";
import "../styles/pages/Signup.css";
import large_logo from "../assets/images/large_logo.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        name: "",
        phone: "",
        type: null // 0: 일반회원, 1: 관리자
    });

    const passwordCheckRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            type: prev.type === Number(value) ? null : Number(value) // 체크하면 설정, 다시 클릭하면 해제
        }));
    };
    const nav = useNavigate()
    // 회원가입 요청
    const handleSignup = async () => {
        try {
            console.log("회원가입 요청:", formData);
            const response = await postsignup(formData); // postsignup 함수 호출

            if (response) {
                console.log("회원가입 성공:", response);
                nav("/login"); // 회원가입 성공 후 이동할 페이지
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
