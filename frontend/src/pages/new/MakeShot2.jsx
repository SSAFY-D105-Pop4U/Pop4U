import '../../styles/testlife/MakeShot.css';

const MakeShot2 = ({ selectedImages, selectedColor }) => {
    return (
        <div className="lifeshot-frame2">
            <div className="lifeshot-frame-container2" style={{ backgroundColor: selectedColor }}>
                {[0, 1].map((index) => (
                    <div 
                        key={index} 
                        className='lifeshot-frame-bg2'
                        style={{
                            backgroundImage: selectedImages[index] ? `url(${selectedImages[index]})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default MakeShot2;
