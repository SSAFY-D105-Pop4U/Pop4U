import '../../styles/testlife/MakeShot.css';

const MakeShot = ({ frameCount }) => {
    return (
        <div className="lifeshot-frame">
            <div className="lifeshot-frame-container">
                {Array.from({ length: frameCount }).map((_, index) => (
                    <div key={index} className="lifeshot-frame-item">
                        Frame {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MakeShot;
