import '../../styles/testlife/MakeShot.css';

const MakeShot4 = ({ selectedImages, selectedColor  }) => {
    return (
        <div className="lifeshot-frame4">
            <div className="lifeshot-frame-container4" style={{ backgroundColor: selectedColor }}>
                {[0, 1, 2, 3].map((index) => (
                    <div key={index} className='lifeshot-frame-bg4'>
                        {selectedImages[index] && (
                            <img 
                                src={selectedImages[index]} 
                                alt={`Selected ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MakeShot4;
