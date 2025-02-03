import GoogleLogin from "../components/GoogleLogin"
import LargeLogo from "../assets/LargeLogo.png"
import "../styles/SocialLogin.css"


const SocialLogin = () => {
    return (
        <div>
            <div className="LargeLogo">
                <img src={LargeLogo} alt="Logo" width="200" />
            </div>
            <div className="title">
                <h2>오직 당신을 위한 팝업 스토어</h2>
                <h3>pop4U</h3>
                <h4>3초 만에 빠른 회원가입</h4>
            </div>
            <GoogleLogin />
        </div>

    )

}

export default SocialLogin

