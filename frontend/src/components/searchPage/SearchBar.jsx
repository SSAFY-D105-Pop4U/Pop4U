import "../../styles/components/SearchBar.css";
import { useState,useEffect } from "react";
import searchIcon from "../../assets/icons/search.svg";
import BackButton from "../../components/BackButton";

const SearchBar = ({ onSearch ,searchQuery}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onSearch(event.target.value); // 부모로 검색어 전달
  };

  useEffect(() => {
    console.log("useEffect 실행됨 - 새로운 searchQuery 값:", searchQuery);
    setInputValue(searchQuery || ""); // 값이 없으면 빈 문자열 설정
  }, [searchQuery]);

  const onClick = () => {
    const newValue = "asdsa";
    setInputValue(newValue);
  };

  return (
    <div className="search-container">
      <BackButton />

      <div className="search-bar">
        <img src={searchIcon} alt="search" className="search-icon" onClick={onClick} />
        <input
          type="text"
          placeholder="검색하기"
          className="search-input"
          value={inputValue}
          onChange={handleInputChange} // 입력 값이 변경될 때 호출
        />
      </div>
    </div>
  );
};

export default SearchBar;
