import { useState, useRef, useEffect } from 'react';
import '../../styles/components/DraggableGallery.css';

const DraggableGallery = ({ selectedIcon }) => {


  const [canvasImages, setCanvasImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState(null);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedIcon && selectedIcon.url) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      
      const newImage = {
        ...selectedIcon,
        instanceId: Date.now().toString(),
        position: {
          x: (rect.width / 2) - 50, // 50x50 크기의 절반을 빼서 중앙 정렬
          y: (rect.height / 2) - 50
        },
        width: 100,  // 고정된 너비 50px
        height: 100, // 고정된 높이 50px
        scale: 1,
        rotation: 0
      };
      
      setCanvasImages(prev => [...prev, newImage]);
    }
  }, [selectedIcon]);

  // 드래그 시작
  const handleDragStart = (e, image) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.clientX || e.touches?.[0].clientX;
    const clientY = e.clientY || e.touches?.[0].clientY;
    
    setIsDragging(true);
    setDragStartPos({
      x: clientX - rect.left - image.position.x,
      y: clientY - rect.top - image.position.y,
      imageId: image.instanceId
    });
  };

  // 드래그 중
  const handleDragMove = (e) => {
    if (!isDragging || !dragStartPos) return;

    const clientX = e.clientX || e.touches?.[0].clientX;
    const clientY = e.clientY || e.touches?.[0].clientY;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const newX = clientX - rect.left - dragStartPos.x;
    const newY = clientY - rect.top - dragStartPos.y;

    setCanvasImages(prevImages =>
      prevImages.map(img =>
        img.instanceId === dragStartPos.imageId
          ? { ...img, position: { x: newX, y: newY } }
          : img
      )
    );
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setIsDragging(false);
    setDragStartPos(null);
  };

  // 이미지 크기 조절
  const handleResize = (e, image, corner) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    const startWidth = image.width || 100;
    const startHeight = image.height || 100;

    const handleMove = (moveEvent) => {
      const currentX = moveEvent.clientX - rect.left;
      const currentY = moveEvent.clientY - rect.top;
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (corner.includes('right')) {
        newWidth = Math.max(50, startWidth + deltaX);
      }
      if (corner.includes('bottom')) {
        newHeight = Math.max(50, startHeight + deltaY);
      }

      setCanvasImages(prevImages =>
        prevImages.map(img =>
          img.instanceId === image.instanceId
            ? { ...img, width: newWidth, height: newHeight }
            : img
        )
      );
    };

    const handleEnd = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  };

  // 이미지 삭제
  const handleDeleteImage = (instanceId) => {
    setCanvasImages(prevImages => 
      prevImages.filter(img => img.instanceId !== instanceId)
    );
    setSelectedImage(null);
  };

  // 이미지 선택 시 조절 UI 표시
  const handleImageSelect = (e, image) => {
    e.stopPropagation();
    setSelectedImage(image);
  };

  // 크기와 각도 조절
  const handleAdjust = (e, image) => {
    e.stopPropagation();
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const startX = e.clientX || e.touches?.[0].clientX;
    const startY = e.clientY || e.touches?.[0].clientY;
    const startScale = image.scale || 1;
    const startRotation = image.rotation || 0;
    
    // 이미지의 중심점 계산 (고정될 위치)
    const centerX = image.position.x + ((image.width || 100) * startScale) / 2;
    const centerY = image.position.y + ((image.height || 100) * startScale) / 2;
    
    const startAngle = Math.atan2(startY - rect.top - centerY, startX - rect.left - centerX);

    const handleMove = (moveEvent) => {
      const currentX = moveEvent.clientX || moveEvent.touches?.[0].clientX;
      const currentY = moveEvent.clientY || moveEvent.touches?.[0].clientY;
      
      // 거리 계산
      const startDistance = Math.hypot(startX - rect.left - centerX, startY - rect.top - centerY);
      const currentDistance = Math.hypot(currentX - rect.left - centerX, currentY - rect.top - centerY);
      
      // 크기 조절 (원본 크기의 30% 제한)
      const scaleFactor = currentDistance / startDistance;
      const maxScale = 1.3; // 최대 130%까지만 허용
      const minScale = 0.7; // 최소 70%까지만 허용
      const newScale = Math.max(minScale, Math.min(maxScale, startScale * scaleFactor));
      
      // 회전 계산
      const currentAngle = Math.atan2(currentY - rect.top - centerY, currentX - rect.left - centerX);
      const angleDiff = ((currentAngle - startAngle) * 180) / Math.PI;
      const newRotation = startRotation + angleDiff;

      // 새로운 위치 계산 (중심점 유지)
      const newWidth = (image.width || 100) * newScale;
      const newHeight = (image.height || 100) * newScale;
      const newX = centerX - newWidth / 2;
      const newY = centerY - newHeight / 2;

      setCanvasImages(prevImages =>
        prevImages.map(img =>
          img.instanceId === image.instanceId
            ? {
                ...img,
                scale: newScale,
                rotation: newRotation,
                position: { x: newX, y: newY }
              }
            : img
        )
      );
    };

    const handleEnd = () => {
      setIsAdjusting(false);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
  };

  return (
    <div className="icon-draggable-container">
      

        <div
            ref={canvasRef}
            className="icon-canvas-container"
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onClick={() => setSelectedImage(null)}
        >
            {canvasImages.map((image) => {
            const scale = image.scale || 1;
            const width = (image.width || 100) * scale;
            const height = (image.height || 100) * scale;

            return (
                <div
                key={image.instanceId}
                className={`icon-canvas-image-wrapper ${selectedImage?.instanceId === image.instanceId ? 'selected' : ''}`}
                style={{
                    position: 'absolute',
                    left: `${image.position.x}px`,
                    top: `${image.position.y}px`,
                    cursor: isDragging ? 'grabbing' : 'grab',
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `rotate(${image.rotation || 0}deg)`,
                    transformOrigin: 'center',
                }}
                onMouseDown={(e) => handleDragStart(e, image)}
                onTouchStart={(e) => handleDragStart(e, image)}
                onClick={(e) => handleImageSelect(e, image)}
                >
                <div
                    className="icon-canvas-image"
                    style={{
                        width: '100%',
                        height: '100%',
                        transformOrigin: 'center',
                    }}
                >
                    <img
                        src={image.url}
                        alt={image.title}
                        className="icon-gallery-image"
                        draggable={false}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'  // 이미지 비율을 유지하면서 컨테이너에 맞춤
                        }}
                    />
                </div>

                {selectedImage?.instanceId === image.instanceId && (
                    <>
                    <div 
                        className="icon-control-frame"
                        style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: '2px solid #fff',
                        boxSizing: 'border-box',
                        pointerEvents: 'none'
                        }}
                    />
                    <div className="icon-control-buttons-container">
                        <button
                        className="icon-control-button icon-delete-button"
                        onClick={() => handleDeleteImage(image.instanceId)}
                        style={{
                            position: 'absolute',
                            top: -12,
                            right: -12,
                            transform: `rotate(${-(image.rotation || 0)}deg)`
                        }}
                        >
                        ×
                        </button>
                        <button
                        className="icon-control-button icon-adjust-button"
                        onMouseDown={(e) => handleAdjust(e, image)}
                        onTouchStart={(e) => handleAdjust(e, image)}
                        style={{
                            position: 'absolute',
                            bottom: -12,
                            right: -12,
                            transform: `rotate(${-(image.rotation || 0)}deg)`
                        }}
                        >
                        ⤡
                        </button>
                    </div>
                    </>
                )}
                </div>
            );
            })}
        </div>
    </div>
  );
};

export default DraggableGallery;