import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Signup.css';

const Signup = () => {
    const navigate = useNavigate();

    // State 관리
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
        name: ''
    });

    // 입력 값 변경 핸들러
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 회원가입 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('전송 데이터:', formData);

        try {
            const response = await fetch('https://your-backend-api.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('회원가입 성공!');
                navigate('/login'); // 로그인 페이지로 이동
            } else {
                alert('회원가입 실패!');
            }
        } catch (error) {
            console.error('회원가입 에러:', error);
            alert('서버 오류 발생');
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                {/* 프로필 이미지 */}
                <img className="profile-image" src="https://via.placeholder.com/206x208" alt="프로필" />

                {/* 이름 입력 */}
                <div className="input-box">
                    <input
                        type="text"
                        name="name"
                        placeholder="이름을 입력해 주세요."
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* 이메일 입력 */}
                <div className="input-box">
                    <input
                        type="email"
                        name="email"
                        placeholder="이메일을 입력해 주세요."
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* 전화번호 입력 */}
                <div className="input-box">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="전화번호를 입력해 주세요."
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* 비밀번호 입력 */}
                <div className="input-box">
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력해 주세요."
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* 회원가입 버튼 */}
                <button className="signup-button" type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
