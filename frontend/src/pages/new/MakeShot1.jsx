import '../../styles/testlife/MakeShot.css';

const MakeShot1 = ({ selectedImage, selectedColor }) => {
    return (
        <div className="lifeshot-frame1">
            <div className="lifeshot-frame-container" style={{ backgroundColor: selectedColor }}>
                <div 
                    className='lifeshot-frame-bg'
                    style={{
                        backgroundImage: selectedImage ? `url(${selectedImage})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            </div>
        </div>
    );
};

export default MakeShot1;
