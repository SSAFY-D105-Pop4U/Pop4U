import Divider from "../components/basic/Divider";
import { useState } from "react";
import Header from "../components/basic/Header";
import LifeShotFrame from "../components/lifeShotPage/LifeShotFrame";
import ShotToggleButton from "../components/lifeShotPage/ShotToggleButton";
import ColorPicker from "../components/lifeShotPage/ColorPicker";
import '../styles/pages/LifeShot.css';

const LifeShot = () => {

    const [images, setImages] = useState([]);
    const maxImages = 12;
    const [active, setActive] = useState("사진");
    const [selectedColor, setSelectedColor] = useState("#DDDDD");
    

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

  
  

  return (
    <div className="lifeshot-page">
      <Header title={"인생네컷 제작"}/>
      <LifeShotFrame selectedColor={selectedColor}/>
      
      
     
      <ShotToggleButton active={active} setActive={setActive}/>

      <Divider  height="2px" top="0px"/>
    
      {active === "사진" && (
        <div className="lifeshot-image-section">
          <div className="lifeshot-image-scroll">
            {images.map((image, index) => (
              <div key={index} className="lifeshot-image-item">
                <img src={image.preview} alt={`업로드 이미지 ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
      {active === "테마" && (
        <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
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
                <button className="button">저장하기</button>
            </div>
        </div>
      
  
  );
};

export default LifeShot;
