import { useState, useEffect } from "react";
import frame1 from '../../assets/icons/shotframe1.png';
import frame2 from '../../assets/icons/shotframe2.png';
import frame3 from '../../assets/icons/shotframe3.png';
import frame4 from '../../assets/icons/shotframe4.png';
import '../../styles/testlife/LifeFrame.css';

const Frameset = () => {
    const [shakeIndex, setShakeIndex] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            setShakeIndex(0); // 첫 번째 프레임부터 애니메이션 시작

            setTimeout(() => setShakeIndex(1), 500); // 0.5초 후 두 번째 프레임
            setTimeout(() => setShakeIndex(2), 1000); // 1초 후 세 번째 프레임
            setTimeout(() => setShakeIndex(3), 1500); // 1.5초 후 네 번째 프레임
            setTimeout(() => setShakeIndex(-1), 2000); // 모든 애니메이션 종료
        }, 5000); // 5초마다 반복 실행

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
    }, []);

    return (
        <div className="frames-wrapper">
            <h2 className="frames-title">Choose Your Frame</h2>

            <div className="frames-container">
                <div className={`shot-frame ${shakeIndex === 0 ? "shake" : ""}`}>
                    <img src={frame1} alt="Frame 1"/>
                    <p>One</p>
                </div>
                <div className={`shot-frame ${shakeIndex === 1 ? "shake" : ""}`}>
                    <img src={frame2} alt="Frame 2"/>
                    <p>Two</p>
                </div>
                <div className={`shot-frame ${shakeIndex === 2 ? "shake" : ""}`}>
                    <img src={frame3} alt="Frame 3"/>
                    <p>Three</p>
                </div>
                <div className={`shot-frame ${shakeIndex === 3 ? "shake" : ""}`}>
                    <img src={frame4} alt="Frame 4"/>
                    <p>Four</p>
                </div>
            </div>
        </div>
    );
};

export default Frameset;
