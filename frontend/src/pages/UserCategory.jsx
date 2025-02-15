import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/basic/Header";
import NextButton from "../components/NextButton";
import "../styles/pages/UserCategory.css";

const UserCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const navigate = useNavigate();

  // 백엔드의 GET /category API를 호출하여 모든 카테고리 목록을 불러옵니다.
  useEffect(() => {
    fetch("/category")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories: ", error));
  }, []);

  // 카테고리 id를 기반으로 선택/해제 처리합니다.
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

  // PATCH /category/user API를 호출하여 선택한 카테고리를 저장하고 메인 페이지로 이동합니다.
  const handleSubmit = () => {
    const selectedIds = Array.from(selectedCategories);

    fetch("/category/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedIds),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/home");
        } else {
          console.error("Failed to update user categories");
        }
      })
      .catch((error) =>
        console.error("Error updating user categories:", error)
      );
  };

  return (
    <div className="user-category">
      <Header title="카테고리" />
      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-item ${
              selectedCategories.has(category.id) ? "selected" : ""
            }`}
            onClick={() => toggleCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <NextButton onClick={handleSubmit}>등록하기</NextButton>
    </div>
  );
};

export default UserCategory;
