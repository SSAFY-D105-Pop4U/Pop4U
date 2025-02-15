import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/basic/Header";
import NextButton from "../components/NextButton";
import api from "../apis/api/instance"; // Axios 인스턴스 임포트
import "../styles/pages/UserCategory.css";

const UserCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const navigate = useNavigate();

  // GET /category API 호출하여 모든 카테고리 목록 불러오기
  useEffect(() => {
    api
      .get("/category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("카테고리 불러오기 실패:", error));
  }, []);

  // 선택/해제 처리: 카테고리의 id를 기준으로 관리합니다.
  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(categoryId)) {
        newSelected.delete(categoryId);
      } else {
        newSelected.add(categoryId);
      }
      return newSelected;
    });
  };

  // PATCH /category/user API 호출하여 선택한 카테고리 저장 후 메인 페이지로 이동
  const handleSubmit = () => {
    const selectedIds = Array.from(selectedCategories);

    api
      .patch("/category/user", selectedIds)
      .then(() => navigate("/home"))
      .catch((error) => console.error("관심 카테고리 업데이트 실패:", error));
  };

  return (
    <div className="user-category">
      <Header title="카테고리" />
      <div className="categories-container">
        {categories.map((category) => (
          <button key={category.id} className={`category-item ${selectedCategories.has(category.id) ? "selected" : ""}`} onClick={() => toggleCategory(category.id)}>
            {category.name}
          </button>
        ))}
      </div>
      <NextButton onClick={handleSubmit}>등록하기</NextButton>
    </div>
  );
};

export default UserCategory;
