import { useState, useRef, useEffect } from "react";
import "../../styles/components/Filter.css";
import "../../styles/components/SortMenu.css";

const Filter = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("정렬");
  const [selectedCategory, setSelectedCategory] = useState("카테고리");
  const sortRef = useRef(null);
  const categoryRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const dropdownRef = useRef(null);

  const sortOptions = [ "인기순", "최신순", "마감순"];
  const categoryOptions = [ "전시", "팝업스토어", "클래스","전시", "팝업스토어", "클래스","전시", "팝업스토어", "클래스","전시", "팝업스토어", "클래스","전시", "팝업스토어", "클래스"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSortClick = (option) => {
    setSelectedSort(option);
    setIsSortOpen(false);
  };

  const handleCategoryClick = (option) => {
    setSelectedCategory(option);
    setIsCategoryOpen(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - dropdownRef.current.offsetTop);
    setScrollTop(dropdownRef.current.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const y = e.pageY - dropdownRef.current.offsetTop;
    const walk = (y - startY) * 2; // 스크롤 속도 조절
    dropdownRef.current.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="filter-wrapper">
      <label className="reservation-checkbox">
        <input type="checkbox" />
        <span>예약가능</span>
      </label>
      
      <div className="button-group">
        <div className="filter-container" ref={categoryRef}>
          <button 
            className="filter-button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            {selectedCategory}
            <span className="arrow-down">▼</span>
          </button>
          
          {isCategoryOpen && (
            <div 
              className="custom-dropdown"
              ref={dropdownRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {categoryOptions.map((option) => (
                <div
                  key={option}
                  className={`dropdown-option ${selectedCategory === option ? 'selected' : ''}`}
                  onClick={() => handleCategoryClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="filter-container" ref={sortRef}>
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
