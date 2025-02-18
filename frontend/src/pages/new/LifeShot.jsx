import { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';
import InsertShot from "./InsertShot";
import Frameset from "./FrameSet";
import MakeShot1 from "./MakeShot1";
import MakeShot2 from "./MakeShot2.jsx";
import DraggableGallery from "../../components/lifeShotPage/DraggableGallery";
import ShotToggleButton from "../../components/lifeShotPage/ShotToggleButton";
import PutImage from "./PutImge";
import MakeShot3 from "./MakeShot3.jsx";
import MakeShot4 from "./MakeShot4.jsx";
import ColorPicker from "../../components/lifeShotPage/ColorPicker";
import backBtn from '../../assets/icons/backBtn.png'


import { useLocation } from "react-router-dom";

import ShotIcon from "../../components/lifeShotPage/ShotIcon"; 

const LifeShot = () => {
    const [isNext, setIsNext] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [frameCount, setFrameCount] = useState(0);
    const [active, setActive] = useState("사진");
    const [selectedColor, setSelectedColor] = useState("#DDDDD");
    const [images, setImages] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState("");
    // URL 쿼리 파라미터에서 popupId 받아오기
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
    const popupId = queryParams.get("popupId");
    const [selectedImages, setSelectedImages] = useState({
        1: null,
        2: [],
        3: [],
        4: []
    });

    const captureRef = useRef(null);
    const makeShot1Ref = useRef(null);
    const makeShot2Ref = useRef(null);
    const makeShot3Ref = useRef(null);
    const makeShot4Ref = useRef(null);

    const handleCapture = async () => {
        if (!captureRef.current) {
            console.error("캡처할 요소가 없습니다.");
            return;
        }
    
        // 기존 transform 저장
        const originalTransform = captureRef.current.style.transform;

        // 가로 비율만 1.05배 확대 (예시)
        captureRef.current.style.transform = "scaleX(1.1)";

        try {
            const canvas = await html2canvas(captureRef.current, {
                useCORS: true, // CORS 문제 해결
                backgroundColor: "#fff", // 배경을 흰색으로 설정 (투명 배경 유지하려면 null)
                scale: 2, // 해상도 증가
                logging: true, // 디버깅용 로깅
            });
    
            const image = canvas.toDataURL("image/png");
    
            // 이미지 다운로드
            const link = document.createElement("a");
            link.href = image;
            link.download = `lifeshot_capture.png`;
            link.click();
        } catch (error) {
            console.error("캡처 중 오류 발생:", error);
        } finally {
            // 원래 transform 복원
            captureRef.current.style.transform = originalTransform;
          }
    };
    

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        
        const newImages = files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
    
        setImages((prev) => [...prev, ...newImages]);
      };

    // 📱 터치 드래그 종료 (애니메이션 시작)
    const handleNext = () => {
        setIsAnimating(true); // ✅ 먼저 애니메이션 상태 변경
        console.log("애니메이션 시작됨! (isAnimating = true)");

        setTimeout(() => {
            setIsNext(true); // ✅ 애니메이션이 끝난 후 새로운 화면 렌더링
            console.log("Frameset으로 변경됨! (isNext = true)");
        }, 500); // 애니메이션 지속 시간 (0.5초 후 상태 변경)
    };

     // 📱 Frameset → Frame 선택 애니메이션 (Frameset이 옆으로 사라짐)
     const handleFrame = (count) => {
        setIsAnimating(true); // ✅ 애니메이션 시작
        setTimeout(() => {
            setFrameCount(count);
            setIsAnimating(false); // ✅ 애니메이션 종료
        }, 500);
    };

    // 이모티콘 선택 핸들러 추가
    const handleEmoticonSelect = (emoticon) => {
        setSelectedIcon(emoticon);
    };

    const handleImageSelect = (imageUrl) => {
        setSelectedImages(prev => {
            // frameCount에 따라 다르게 처리
            switch(frameCount) {
                case 1:
                    return { ...prev, 1: imageUrl };
                case 2:
                    if (prev[2].length < 2) {
                        return { ...prev, 2: [...prev[2], imageUrl] };
                    }
                    return prev;
                case 3:
                    if (prev[3].length < 3) {
                        return { ...prev, 3: [...prev[3], imageUrl] };
                    }
                    return prev;
                case 4:
                    if (prev[4].length < 4) {
                        return { ...prev, 4: [...prev[4], imageUrl] };
                    }
                    return prev;
                default:
                    return prev;
            }
        });
    };

    return (
        <div style={{ backgroundColor: "black", height: "100vh", overflow: "hidden" }}>
            <header id="header">
                <div style={{display:'flex'}}>
                <div className="life-back-btn" style={{animation: "fadeIn 1s ease-out forwards"}}><img src={backBtn}></img></div>
                <div style={{ textAlign: "center", width:"100%", marginTop:"15px", marginRight:"30px",animation: "fadeIn 1s ease-out forwards"}}>
                        <span className="frames-title" >Pop4Cut</span>
                </div>
                </div>
            </header>
               
            {(!isNext) && (
                <InsertShot handleNext={handleNext} isAnimating={isAnimating} />
            ) }
            {isNext && (frameCount==0) && (
                 <Frameset handleFrame={handleFrame} isAnimating={isAnimating} />
            )}
            <div ref={captureRef} style={{width:"300px", height:"466px", margin: "45px auto 0"} }>
            
            {(frameCount==1) && (
                <div >
                    <MakeShot1 
                        selectedImage={selectedImages[1]} 
                        selectedColor={selectedColor}
                    />
                </div>
            )}
            {(frameCount==2) && (
                <div >
                    <MakeShot2 
                        selectedImages={selectedImages[2]} 
                        selectedColor={selectedColor}
                    />
                </div>
            )}
            {(frameCount==3) && (
                <div >
                    <MakeShot3 
                        selectedImages={selectedImages[3]} 
                        selectedColor={selectedColor}
                    />
                </div>
            )}
            {(frameCount==4) && (
                <div >
                    <MakeShot4 
                        selectedImages={selectedImages[4]} 
                        selectedColor={selectedColor}
                    />
                </div>
            )}
            {(frameCount>0) && (
            <DraggableGallery selectedIcon={selectedIcon}/>
            )}
            </div>
            {(frameCount>0) && (
                <ShotToggleButton active={active} setActive={setActive}/>
                
            )}
            {(frameCount>0)&&(active=="사진")&&(
                <PutImage 
                    images={images} 
                    frameCount={frameCount} 
                    onImageSelect={handleImageSelect}
                />
            )}
             {active === "테마" && (
          <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
        )}{active === "캐릭터" && (
            <ShotIcon 
            popupId={popupId}
              selectedIcon={selectedIcon} 
              setSelectedIcon={setSelectedIcon}
              onSelectEmoticon={handleEmoticonSelect}
            />
          )}
            

            {(frameCount>0)&& (active=="사진")&&(
                <label className="life-upload-button">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <div className="life-upload-placeholder">
                사진 넣기
              </div>
            </label>
            )}
            {(frameCount>0)&& (active=="캐릭터")&&(
                <button onClick={handleCapture} className="life-upload-button">저장하기</button>
            )}
        </div>
    );
};

export default LifeShot;
