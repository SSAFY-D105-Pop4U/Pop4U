import { useState } from "react";
import "../../styles/components/Filter.css";
import "../../styles/components/SortMenu.css";

const Filter = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("정렬");
  const [selectedCategory, setSelectedCategory] = useState("카테고리");

  const sortOptions = ["정렬", "인기순", "최신순", "마감임박순"];
  const categoryOptions = ["카테고리", "전시", "팝업스토어", "클래스"];

  const handleSortClick = (option) => {
    setSelectedSort(option);
    setIsSortOpen(false);
  };

  const handleCategoryClick = (option) => {
    setSelectedCategory(option);
    setIsCategoryOpen(false);
  };

  return (
    <div className="filter-wrapper">
      <label className="reservation-checkbox">
        <input type="checkbox" />
        <span>예약가능</span>
      </label>
      
      <div className="button-group">
        <div className="filter-container">
          <button 
            className="filter-button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            {selectedCategory}
            <span className="arrow-down">▼</span>
          </button>
          
          {isCategoryOpen && (
            <div className="custom-dropdown">
              {categoryOptions.map((option) => (
                <div
                  key={option}
                  className={`dropdown-option ${selectedCategory === option ? 'selected' : ''}`}
                  onClick={() => handleCategoryClick(option)}
                >
                  {selectedCategory === option && <span className="check-mark">✓</span>}
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="filter-container">
          <button 
            className="filter-button"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            {selectedSort}
            <span className="arrow-down">▼</span>
          </button>
          
          {isSortOpen && (
            <div className="custom-dropdown">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  className={`dropdown-option ${selectedSort === option ? 'selected' : ''}`}
                  onClick={() => handleSortClick(option)}
                >
                  {selectedSort === option && <span className="check-mark">✓</span>}
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
