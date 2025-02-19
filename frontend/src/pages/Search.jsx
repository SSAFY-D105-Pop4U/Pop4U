import { useState } from "react";
import RankingList from "../components/searchPage/RankingList";
import SearchBar from "../components/searchPage/SearchBar";
import Suggest from "../components/searchPage/Suggest";
import SearchList from "../components/searchPage/SearchList";
import Divider from "../components/basic/Divider";
import '../styles/pages/Search.css'


const Search = () => {

  const [searchQuery, setSearchQuery] = useState("");
  
  // 검색어 상태 업데이트 함수
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return <div>
    <div className="search-header"> 
    <SearchBar onSearch={handleSearch} searchQuery={searchQuery}/>
    </div>
    {!searchQuery ? (
    <div>
    <h3 className="search-title-h3">인기 검색어</h3>
    <RankingList setOnClickSearch={setSearchQuery} onClickSearch={searchQuery}/>
    <h3 className="search-title-h3">내 관심기반 추천해요</h3>
    <Suggest/>
    </div>
    ):(<div> 
       <SearchList searchQuery={searchQuery}/> 
       </div>)}
  </div>;
};

export default Search;
