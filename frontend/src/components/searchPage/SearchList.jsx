import '../../styles/components/SearchList.css'
import Divider from '../basic/Divider'
import { useEffect, useState } from "react";
import { getSearch } from "../../apis/api/api.js";
import { useNavigate } from "react-router-dom";

const SearchList = ({ searchQuery }) => {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleCardClick = (popupId) => {
    nav(`/detail?popupId=${popupId}`);
  };
    
  useEffect(() => {
    // 검색어가 비어있으면 API 호출하지 않음
    if (!searchQuery?.trim()) {
      setSearchData([]);
      return;
    }

    setIsLoading(true);
    const fetchPopups = async () => {
      try {
        const data = await getSearch(searchQuery);
        setSearchData(data);
      } catch (error) {
        console.error("Failed to load popups:", error);
        setSearchData([]); // 에러 시 데이터 초기화
      } finally {
        setIsLoading(false);
      }
    };
  
    const timeoutId = setTimeout(() => {
      fetchPopups();
    }, 500);
  
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  if (isLoading) {
    return <div className="search-results">검색 중...</div>;
  }

  // 검색 결과가 없을 때
  if (searchData.length === 0 && searchQuery?.trim()) {
    return <div className="search-results">검색 결과가 없습니다.</div>;
  }

  return (
    <div className="search-results">
      {searchData.map((result) => (
        <div 
          key={result.popupId}
          className="result-wrapper"
          onClick={() => handleCardClick(result.popupId)}
        >
          <div className="result-image-container">
            <img 
              src={result.popupImages[0]} 
              alt={result.popupName} 
              className="result-image"
            />
            <div className="result-info-overlay">
              <h3 className="result-title">{result.popupName}</h3>
              <p className="result-time">{result.popupStartDate}~{result.popupEndDate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchList;