import { useRef, useState } from "react";
import '../../styles/testlife/PutImage.css';

const PutImage = ({ images, frameCount, onImageSelect }) => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleImageClick = (image, index) => {
        if (!isDragging && frameCount > 0) {
            onImageSelect(image.preview);
        }
    };

    return (
        <div className="life-image-container">
            <div 
                className="life-image-grid"
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
            >
                {images.map((image, index) => (
                    <div 
                        key={index} 
                        className="life-mage-preview"
                        onClick={() => handleImageClick(image, index)}
                        style={{
                            cursor: frameCount > 0 ? 'pointer' : 'not-allowed',
                            opacity: frameCount > 0 ? 1 : 0.5
                        }}
                    >
                        <img src={image.preview} alt={`업로드 이미지 ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PutImage;
