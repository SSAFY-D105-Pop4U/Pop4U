import '../../styles/testlife/MakeShot.css';

const MakeShot1 = ({ selectedImage, selectedColor }) => {
    return (
        <div className="lifeshot-frame1">
            <div className="lifeshot-frame-container" style={{ backgroundColor: selectedColor }}>
                <div className='lifeshot-frame-bg'>
                    {selectedImage && (
                        <img 
                            src={selectedImage} 
                            alt="Selected"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MakeShot1;
