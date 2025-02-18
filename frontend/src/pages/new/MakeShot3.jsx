import '../../styles/testlife/MakeShot.css';

const MakeShot3 = ({ selectedImages, selectedColor }) => {
    return (
        <div className="lifeshot-frame3">
            <div className="lifeshot-frame-container3" style={{ backgroundColor: selectedColor }}>
                {[0, 1, 2].map((index) => (
                    <div 
                        key={index} 
                        className='lifeshot-frame-bg3'
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

export default MakeShot3;
