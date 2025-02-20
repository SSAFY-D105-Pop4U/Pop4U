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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();
  const [login, setlogin] = useState({
    userid: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModal = (e) => {
    setIsModalOpen(true)
  };


  //api 호출
  const handleLogin = async () => {
    try {
      const loginData = {
        email: login.userid,
        password: login.password,
      };
      console.log("로그인 요청:", loginData);
      const response = await postlogin(loginData);

      if (response && response.data && response.data.accessToken) {
        console.log("로그인 성공:", response);

        // 최신 토큰을 저장
        sessionStorage.setItem("accessToken", response.data.accessToken);
        setToken(response.data.accessToken); // useState의 토큰도 업데이트

        sessionStorage.setItem("userId", response.data.userId);

        sessionStorage.setItem("accessToken", response.data.accessToken);

        sessionStorage.setItem("userNickname", response.data.userNickname);

        sessionStorage.setItem("userStatus", response.data.userStatus);

        // // Context에도 반영
        // setAppData((prev) => ({
        //     ...prev,
        //     userId: response.data.userId,
        //     Token: response.data.accessToken
        // }));
        nav("/twohome"); // 로그인 성공 후 이동
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="login-container">
      {/* 로그인 폼 */}
      <div className="login-box">
        <img src={large_logo} alt="Logo" className="login-logo" />

        <div className="input-box">
          <input
          className="login-input-field"
            style={{padding:"10px",fontSize:"13px"}}
            type="text"
            name="userid"
            placeholder="아이디를 입력해 주세요."
            
            value={login.userid}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          
          <input
            style={{padding:"10px",fontSize:"13px"}}
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요."
            className="login-input-field"
            value={login.password}
            onChange={handleChange}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>

        <div className="signup-section">
          <span className="signup-text">아직 회원이 아니신가요? </span>

          {/* 실제 회원가입 */}
          {/* <span className="signup-link" onClick={() => nav("/signup")}>
            회원가입
          </span> */}

          {/* 시연 회원가입 */}
          <span className="signup-link" onClick={handleModal}>
            회원가입
          </span>

        </div>
      </div>

      {isModalOpen  &&(<div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{fontWeight:"bold", fontSize:"20px"}}>알림</h2>

            {/* ✅ URL을 복사할 수 있도록 버튼 추가 */}
            <br />
            해당 서비스는<br/>
            2월 21일 12시부터 이용가능합니다.
            <br />
            
            
            <button onClick={() => setIsModalOpen(false)} style={styles.modalCloseBtn}>
              닫기
            </button>
            
          </div>
        </div>)}
    </div>
  );
};




const styles = {
  container: {
    width: "350px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  /* ✅ 직접 입력하는 시간 입력창 스타일 */
  timeInput: {
    fontSize: "18px",
    padding: "8px",
    margin: "10px 0",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "150px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  /* ✅ 모달 스타일 */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "white",
    padding: "20px",
    width: "350px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },


  copyContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  },
  copyInput: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    textAlign: "center",
  },
  copyButton: {
    padding: "10px 20px",
    backgroundColor: "#002C5F",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
    borderRadius: "5px",
    margin: "10px",
  },
  modalCloseBtn: {
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    color: "#002C5F", 
    border: "2px solid #002C5F",
    cursor: "pointer",
    marginTop: "10px",
    borderRadius: "5px",
  },

  
};

export default Login;
