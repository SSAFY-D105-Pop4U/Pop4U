import React from 'react';
import '../../styles/components/LifeShotFrame.css';

const LifeShotFrame = () => {
  return (
    <div className="lifeshot-frame">
      <div className="frame-container">
        {/* 4개의 사진 영역 */}
        <div className="photo-grid">
          <div className="photo-slot">
            <div className="photo-placeholder">
              {/* 실제 이미지가 들어갈 자리 */}
            </div>
          </div>
          <div className="photo-slot">
            <div className="photo-placeholder">
              {/* 실제 이미지가 들어갈 자리 */}
            </div>
          </div>
          <div className="photo-slot">
            <div className="photo-placeholder">
              {/* 실제 이미지가 들어갈 자리 */}
            </div>
          </div>
          <div className="photo-slot">
            <div className="photo-placeholder">
              {/* 실제 이미지가 들어갈 자리 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeShotFrame;
