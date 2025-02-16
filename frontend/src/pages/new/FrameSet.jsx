import { useState, useEffect } from "react";
import frame1 from '../../assets/icons/shotframe1.png';
import frame2 from '../../assets/icons/shotframe2.png';
import frame3 from '../../assets/icons/shotframe3.png';
import frame4 from '../../assets/icons/shotframe4.png';
import '../../styles/testlife/LifeFrame.css';

const Frameset = ({ handleFrame }) => {
    const [shakeIndex, setShakeIndex] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedFrame, setSelectedFrame] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setShakeIndex(0);
            setTimeout(() => setShakeIndex(1), 500);
            setTimeout(() => setShakeIndex(2), 1000);
            setTimeout(() => setShakeIndex(3), 1500);
            setTimeout(() => setShakeIndex(-1), 2000);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSelectFrame = (frame) => {
        if (isAnimating) return; // 애니메이션 중복 실행 방지
        setIsAnimating(true);
        setSelectedFrame(frame); // 선택된 프레임 저장

        setTimeout(() => {
            handleFrame(frame);
        }, 500);
    };

    return (
        <div className={`frames-wrapper ${isAnimating ? "exit" : ""}`}>
            <h2 className="frames-title">Choose Your Frame</h2>

            <div className="frames-container">
                {[frame1, frame2, frame3, frame4].map((img, index) => (
                    <div
                        key={index}
                        className={`shot-frame ${shakeIndex === index ? "shake" : ""} 
                                    ${selectedFrame === index + 1 ? "selected" : ""}`}
                        onClick={() => handleSelectFrame(index + 1)}
                    >
                        <img src={img} alt={`Frame ${index + 1}`} />
                        <p>Frame {index + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Frameset;
