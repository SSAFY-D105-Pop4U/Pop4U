import { useState } from "react";
import Header from "../components/basic/Header";
import NextButton from "../components/NextButton";
import "../styles/pages/UserCategory.css";

const UserCategory = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "전시",
    "패션",
    "키즈",
    "쇼핑",
    "캐릭터",
    "뷰티",
    "만화",
    "예술",
    "식품",
    "게임",
    "디저트",
    "소품",
    "아이돌",
    "가족",
    "인테리어",
    "주류",
    "영화",
    "스포츠",
    "향수",
    "완구",
    "웹툰",
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      }
      return [...prev, category];
    });
  };

  return (
    <div className="user-category">
      <Header title="카테고리" />
      <div className="categories-container">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-item ${
              selectedCategories.includes(category) ? "selected" : ""
            }`}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <NextButton onClick={() => console.log(selectedCategories)}>
        등록하기
      </NextButton>
    </div>
  );
};

export default UserCategory;
