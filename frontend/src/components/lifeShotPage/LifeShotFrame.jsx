import React from 'react';
import '../../styles/components/LifeShotFrame.css';
import { Droppable } from '@hello-pangea/dnd';

const LifeShotFrame = ({selectedColor, frameImages}) => {
  return (  
    <div className="lifeshot-frame">
      <div className="frame-container" style={{ backgroundColor: selectedColor }}>
        {/* 4개의 사진 영역 */}
        <div className="photo-grid">
          {[0, 1, 2, 3].map((index) => (
            <Droppable key={index} droppableId={`frame-${index}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="photo-slot"
                >
                  <div className={`photo-placeholder ${snapshot.isDraggingOver ? 'drag-over' : ''}`}>
                    {frameImages[index] && (
                      <img 
                        src={frameImages[index].preview} 
                        alt={`프레임 이미지 ${index + 1}`}
                      />
                    )}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default LifeShotFrame;
