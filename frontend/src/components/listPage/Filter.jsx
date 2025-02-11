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
  const categoryOptions = [ "이벤트", "체험", "전시","굿즈", "패션", "뷰티","푸드", "쇼핑", "라이프스타일","테크", "스포츠", "음악","여행", "캐릭터", "도서", "플리마켓", "아트", "컬래버레이션", "리미티드 에디션", "커뮤니티"];

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
            <div className="custom-dropdown1">
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
