import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/basic/Header";
import star from "../assets/icons/star.png";
import fullstar from "../assets/icons/fullstar.png";
import "../styles/pages/WriteReview.css";
import NextButton from "../components/NextButton";
import { postwritereview } from "../apis/api/api";


const WriteReview = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const maxImages = 12;

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > maxImages) {
      alert(`이미지는 최대 ${maxImages}장까지 업로드 가능합니다.`);
      return;
    }
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };


  //api 호출출
  const handleSubmit = async () => {
    try {
      const data = await postwritereview();
      console.log("📌 API 내예약호출:", data);
    } catch (error) {
      console.error("❌ Failed to load reviews", error);
    }

    console.log({
      rating,
      content,
      images,
    });

    setShowCompleteModal(true);
  };

  //후기 작성다하고나서 완료 나왔을때 확인 버튼임임
  const handleConfirm = () => {
    setShowCompleteModal(false);
    navigate("/detail");
  };

  return (
    <div className="write-review-container">
      <Header title="리뷰 작성" />

      <div className="rating-section">
        <p className="section-title">별점을 선택해주세요</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((starNum) => (
            <img
              key={starNum}
              src={starNum <= rating ? fullstar : star}
              alt={`별점 ${starNum}점`}
              onClick={() => handleStarClick(starNum)}
            />
          ))}
        </div>
      </div>

      <div className="image-upload-section">
        <p>방문 사진을 올려주세요</p>
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={image.preview} alt={`업로드 이미지 ${index + 1}`} />
              <button
                className="remove-image"
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
            </div>
          ))}
          {images.length < maxImages && (
            <label className="upload-button">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <div className="upload-placeholder">
                {images.length}/{maxImages}
              </div>
            </label>
          )}
        </div>
      </div>

      <div className="content-section">
        <p>자세한 후기를 알려주세요</p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="리뷰 내용을 작성해주세요"
          maxLength={1000}
        />
        <div className="char-count">{content.length}/1000자</div>
      </div>

      <NextButton
        onClick={handleSubmit}
        isDisabled={!rating || !content.trim()}
      >
        리뷰 작성 완료
      </NextButton>

      {showCompleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="complete-icon">✓</div>
            <h3>리뷰 작성을 완료했어요</h3>
            <p>
              소중한 시간을 내어
              <br />
              리뷰를 작성해주셔서 감사합니다
            </p>
            <div className="modal-buttons">
              <NextButton onClick={handleConfirm}>확인</NextButton>
              <button
                className="manage-button"
                onClick={() => {
                  /* 인생네컷 관리 페이지로 이동 */
                }}
              >
                인생네컷 만들러 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteReview;
