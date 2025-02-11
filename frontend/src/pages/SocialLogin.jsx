import GoogleLogin from "../components/GoogleLogin";
import large_logo from "../assets/images/large_logo.png";
// import kakao from "../assets/images/kakao.png"
import "../styles/pages/SocialLogin.css";

const SocialLogin = () => {
  return (
    <div className="social-login-container">
      <div className="large-logo">
        <img src={large_logo} alt="large-Logo" />
      </div>

      <div className="main-content">
        <div className="title">오직 당신을 위한 팝업스토어</div>
        <div className="subtitle">pop4U</div>
        <div className="quick-signup">⚡ 3초 만에 빠른 회원가입</div>
      </div>

      {/* 구글 로그인 버튼 */}
      <GoogleLogin />

      {/* 카카오오 로그인 버튼 */}
      {/* <div className="kako-logo">
                <img src={kakao} alt="Google Logo" />
            </div> */}

      <div className="bottom-section">
        <div className="admin-login">관리자 회원이신가요?</div>
      </div>
    </div>
  );
};

export default SocialLogin;
