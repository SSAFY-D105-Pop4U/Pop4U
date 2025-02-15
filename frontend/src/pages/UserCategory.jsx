import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/basic/Header";
import NextButton from "../components/NextButton";
import api from "../apis/api/instance";
import "../styles/pages/UserCategory.css";

const UserCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const navigate = useNavigate();

  // 모든 카테고리 불러오기
  useEffect(() => {
    console.log("카테고리 데이터를 불러옵니다...");
    api
      .get("/category")
      .then((response) => {
        console.log("카테고리 응답 데이터:", response.data);
        setCategories(response.data);
      })
      .catch((error) =>
        console.error("카테고리 데이터를 불러오는 중 오류 발생:", error)
      );
  }, []);

  // 카테고리 선택/해제 처리
  const toggleCategory = (categoryId) => {
    console.log("카테고리 선택/해제 시도, categoryId:", categoryId);
    setSelectedCategories((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(categoryId)) {
        newSelected.delete(categoryId);
        console.log(`카테고리 ${categoryId} 선택 해제됨`);
      } else {
        newSelected.add(categoryId);
        console.log(`카테고리 ${categoryId} 선택됨`);
      }
      console.log("현재 선택된 카테고리 목록:", Array.from(newSelected));
      return newSelected;
    });
  };

  // PATCH 요청 후 메인 페이지로 이동
  const handleSubmit = () => {
    const selectedIds = Array.from(selectedCategories);
    console.log("선택된 카테고리 id 목록 제출:", selectedIds);
    api
      .patch("/category/user", selectedIds)
      .then((response) => {
        console.log("관심 카테고리 업데이트 성공:", response.data);
        navigate("/home");
      })
      .catch((error) =>
        console.error("관심 카테고리 업데이트 실패:", error)
      );
  };

  return (
    <div className="user-category">
      <Header title="카테고리" />
      <div className="categories-container">
        {categories && categories.length > 0 ? (
          categories.map((category) => {
            console.log("렌더링 카테고리:", category);
            return (
              <button
                key={category.categoryId}
                className={`category-item ${
                  selectedCategories.has(category.categoryId) ? "selected" : ""
                }`}
                onClick={() => toggleCategory(category.categoryId)}
              >
                {category.categoryName}
              </button>
            );
          })
        ) : (
          <p>카테고리를 불러오는 중입니다...</p>
        )}
      </div>
      <NextButton onClick={handleSubmit}>등록하기</NextButton>
    </div>
  );
};

export default UserCategory;
