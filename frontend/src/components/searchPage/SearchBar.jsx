import "../../styles/components/SearchBar.css";
import { useState, useEffect } from "react";
import { Search } from 'lucide-react'; // lucide-react 아이콘 사용
import BackButton from "../../components/BackButton";

const SearchBar = ({ onSearch, searchQuery }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onSearch(event.target.value);
  };

  useEffect(() => {
    setInputValue(searchQuery || "");
  }, [searchQuery]);

  return (
    <div className="search-container">
      <BackButton />
      <div className="search-bar">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="검색하기"
          className="search-input"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;