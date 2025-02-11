import { useState } from "react";
import "../../styles/components/Filter.css";
import "../../styles/components/SortMenu.css";

const Filter = ({ showSort = true }) => {
  const [sortOption, setSortOption] = useState("");
  const [categorytOption, setCategoryOption] = useState("");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    console.log("Selected sort option:", event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryOption(event.target.value);
    console.log("Selected sort option:", event.target.value);
  };

  return (
    <div>
      <div className="filter-container">
        {/* 체크박스와 텍스트 */}
        <label className="filter-checkbox-container">
          <input type="checkbox" />
          <span className="filter-checkbox-label">예약가능</span>
        </label>

        <div className="filter-button-container">
          {/* 카테고리 버튼 */}

          <select
            className="filter-oval-button"
            value={categorytOption}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              카테고리
            </option>
            <option value="popular">카테고리1</option>
            <option value="latest">카테고리2</option>
            <option value="endingSoon">카테고리</option>
            <option value="endingSoon1">카테고리1</option>
            <option value="endingSoon2">카테고리2</option>
            <option value="endingSoon3">카테고리3</option>
            <option value="endingSoon4">카테고리4</option>
            <option value="endingSoon5">카테고리5</option>
            <option value="endingSoon6">카테고리6</option>
            <option value="endingSoon7">카테고리7</option>
          </select>

          {/* 정렬 Select Box */}
          {showSort && (
            <select
              className="filter-oval-button"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="" disabled>
                정렬
              </option>
              <option value="popular">인기순</option>
              <option value="latest">최신순</option>
              <option value="endingSoon">마감순</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
