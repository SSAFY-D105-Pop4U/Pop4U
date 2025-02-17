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
    api
      .get("/category")
      .then((response) => {
        setCategories(response.data);
        console.log("카테고리 데이터 get요청 성공")
        console.log(categories)
      })
      .catch((error) =>
        console.error("카테고리 데이터를 불러오는 중 오류 발생:", error)
      );
  }, []);

  // 카테고리 선택/해제 처리
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

  // PATCH 요청 후 메인 페이지로 이동
  const handleSubmit = () => {
    const selectedIds = Array.from(selectedCategories); // ✅ 배열 유지
    console.log(selectedIds)
    api
      .patch("/category/user", selectedIds, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
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
