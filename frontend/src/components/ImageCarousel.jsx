import { useEffect, useState } from "react";
import "../styles/components/ImageCarousel.css";

const ImageCarousel = ({ images }) => {

  useEffect(() =>{

  },[])
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      console.log(`➡ nextImage: ${prevIndex} → ${newIndex}`);
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      console.log(`⬅ prevImage: ${prevIndex} → ${newIndex}`);
      return newIndex;
    });
  };

  return (
    <div className="carousel-container">
      <button className="prev-btn" onClick={prevImage}>⬅</button>
      <img src={images[currentIndex]} alt={`popup-${currentIndex}`} className="carousel-image" />
      <button className="next-btn" onClick={nextImage}>➡</button>
    </div>
  );
};

export default ImageCarousel;
