import { useState, useEffect } from "react";
import InsertShot from "./InsertShot";
import Frameset from "./FrameSet";

const LifeShot = () => {
    const [isNext, setIsNext] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // 📱 터치 드래그 종료 (애니메이션 시작)
    const handleNext = () => {
        setIsAnimating(true); // ✅ 먼저 애니메이션 상태 변경
        console.log("애니메이션 시작됨! (isAnimating = true)");

        setTimeout(() => {
            setIsNext(true); // ✅ 애니메이션이 끝난 후 새로운 화면 렌더링
            console.log("Frameset으로 변경됨! (isNext = true)");
        }, 500); // 애니메이션 지속 시간 (0.5초 후 상태 변경)
    };

    return (
        <div style={{ backgroundColor: "black", height: "100vh", overflow: "hidden" }}>
            {!isNext ? (
                <InsertShot handleNext={handleNext} isAnimating={isAnimating} />
            ) : (
                <Frameset />
            )}
        </div>
    );
};

export default LifeShot;
