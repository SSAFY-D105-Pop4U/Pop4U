import '../../styles/testlife/MakeShot.css';

const MakeShot2 = ({ selectedImages, selectedColor }) => {
    return (
        <div className="lifeshot-frame2">
            <div className="lifeshot-frame-container2" style={{ backgroundColor: selectedColor }}>
                {[0, 1].map((index) => (
                    <div key={index} className='lifeshot-frame-bg2'>
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

export default MakeShot2;
