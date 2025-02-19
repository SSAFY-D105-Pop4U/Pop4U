import "../../styles/components/SearchBar.css";
import { useState, useEffect } from "react";
import searchIcon from "../../assets/icons/search.svg";
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
        <img src={searchIcon} alt="search" className="search-icon" />
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