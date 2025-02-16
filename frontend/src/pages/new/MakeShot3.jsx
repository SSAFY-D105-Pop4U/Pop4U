import '../../styles/testlife/MakeShot.css';
const MakeShot3 = ({ selectedImages, selectedColor }) => {
    return (
        <div className="lifeshot-frame3">
            <div className="lifeshot-frame-container3" style={{ backgroundColor: selectedColor }}>
                {[0, 1, 2].map((index) => (
                    <div key={index} className='lifeshot-frame-bg3'>
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

export default MakeShot3;
