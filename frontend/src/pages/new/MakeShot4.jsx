import '../../styles/testlife/MakeShot.css';

const MakeShot4 = ({ selectedImages, selectedColor  }) => {
    return (
        <div className="lifeshot-frame4">
            <div className="lifeshot-frame-container4" style={{ backgroundColor: selectedColor }}>
                {[0, 1, 2, 3].map((index) => (
                    <div 
                        key={index} 
                        className='lifeshot-frame-bg4'
                        style={{
                            backgroundImage: selectedImages[index] ? `url(${selectedImages[index]})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        {/* 이미지가 없을 때 다른 콘텐츠를 넣을 수 있음 */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MakeShot4;
