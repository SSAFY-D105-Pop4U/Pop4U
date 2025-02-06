import { useState, useRef } from "react";
import "../styles/pages/Signup.css";
import large_logo from "../assets/images/large_logo.png";


const Signup = () => {
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        name: "",
        phone: ""
    });
    const passwordCheckRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    //이거 백엔드로 호출하는 코드
    const handleSignup = () => {
        console.log("회원가입 요청:", formData);
        // 여기에 API 호출 로직 추가 가능
    };

    return (
        <div className="signup-container">
            {/* 회원가입 박스 */}
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
                <button className="signup-button" onClick={handleSignup}>
                    회원가입
                </button>
            </div>
        </div>
    );
};

export default Signup;
