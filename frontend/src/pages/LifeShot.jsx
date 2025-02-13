import Divider from "../components/basic/Divider";
import React,{ useState , useRef} from "react";
import Header from "../components/basic/Header";
import LifeShotFrame from "../components/lifeShotPage/LifeShotFrame";
import ShotToggleButton from "../components/lifeShotPage/ShotToggleButton";
import ColorPicker from "../components/lifeShotPage/ColorPicker";
import '../styles/pages/LifeShot.css';
import DraggableGallery from "../components/lifeShotPage/DraggableGallery";
import ShotIcon from "../components/lifeShotPage/ShotIcon"; 
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import html2canvas from "html2canvas";

const LifeShot = () => {

    const [images, setImages] = useState([]);
    const maxImages = 12;
    const [active, setActive] = useState("사진");
    const [selectedColor, setSelectedColor] = useState("#DDDDD");
    const [frameImages, setFrameImages] = useState(Array(4).fill(null));
    const [selectedIcon, setSelectedIcon] = useState("");

    const captureRef = useRef(null);
    // 캡처 실행 함수
    const handleCapture = async () => {
        if (captureRef.current) {
            try {
                const canvas = await html2canvas(captureRef.current, {
                    allowTaint: true,
                    useCORS: true,
                    backgroundColor: null,
                    scale: 2, // 해상도를 높이기 위해 scale 추가
                    logging: true, // 디버깅을 위한 로깅 활성화
                });
                const image = canvas.toDataURL("image/png");

                // 이미지 다운로드
                const link = document.createElement("a");
                link.href = image;
                link.download = "capture.png";
                link.click();
            } catch (error) {
                console.error("캡처 중 오류 발생:", error);
            }
        }
    };

    // 드래그가 끝났을 때 실행되는 핸들러
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationId = result.destination.droppableId;

        if (destinationId.startsWith('frame-')) {
            const frameIndex = parseInt(destinationId.split('-')[1]);
            const draggedImage = images[sourceIndex];
            
            // 프레임 이미지 업데이트
            const newFrameImages = [...frameImages];
            newFrameImages[frameIndex] = draggedImage;
            setFrameImages(newFrameImages);
        }
    };
    

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > maxImages) {
          alert(`이미지는 최대 ${maxImages}장까지 업로드 가능합니다.`);
          return;
        }
    
        const newImages = files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
    
        setImages((prev) => [...prev, ...newImages]);
      };

      const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
      };

    // 이모티콘 선택 핸들러 추가
    const handleEmoticonSelect = (emoticon) => {
        setSelectedIcon(emoticon);
    };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="lifeshot-page">
        <Header title={"인생네컷 제작"}/>
        
        <div ref={captureRef} style={{ 
            position: 'relative',
            transform: 'translateZ(0)', // 새로운 스택 컨텍스트 생성
            WebkitTransform: 'translateZ(0)'
        }}>
          <LifeShotFrame 
            selectedColor={selectedColor}
            frameImages={frameImages}
          />
          
            <DraggableGallery selectedIcon={selectedIcon}/>
          
        </div>
        
        <ShotToggleButton active={active} setActive={setActive}/>

        <Divider  height="2px" top="0px"/>
      
        {active === "사진" && (
          <div className="lifeshot-image-section">
              <Droppable droppableId="image-list" direction="horizontal">
                  {(provided) => (
                      <div 
                          className="lifeshot-image-scroll"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                      >
                          {images.map((image, index) => (
                              <Draggable 
                                  key={index} 
                                  draggableId={`image-${index}`} 
                                  index={index}
                              >
                                  {(provided, snapshot) => (
                                      <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={`lifeshot-image-item ${
                                              snapshot.isDragging ? 'dragging' : ''
                                          }`}
                                      >
                                          <img 
                                              src={image.preview} 
                                              alt={`업로드 이미지 ${index + 1}`}
                                          />
                                      </div>
                                  )}
                              </Draggable>
                          ))}
                          {provided.placeholder}
                      </div>
                  )}
              </Droppable>
          </div>
        )}
        {active === "테마" && (
          <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
        )}{active === "캐릭터" && (
          <ShotIcon 
            selectedIcon={selectedIcon} 
            setSelectedIcon={setSelectedIcon}
            onSelectEmoticon={handleEmoticonSelect}
          />
        )}
       
      
            {/* ✅ 버튼 영역 */}
        <div className="button-wrapper">
          
                  <label className="lifeshot-upload-btn">
                      <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      />
                      사진넣기
                  </label>
                  <button onClick={handleCapture} className="button" >저장하기</button>
              </div>
          </div>
        </DragDropContext>
      
    
  );
};

export default LifeShot;
