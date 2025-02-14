import '../../styles/components/RankingList.css';
import { useEffect, useState } from "react";

import { getSearchRanking } from "../../apis/api/api.js";



  

const RankingList = ({onClickSearch, setOnClickSearch}) => {

  const [searchRank, setSearchRank] = useState([]);

  const handleSearchClick = (col) => {
    console.log(col);
    
    setOnClickSearch(col);
    
  };
  
  useEffect(() => {

    {/* 인기 검색어 조회 api 호출 */}
      const fetchPopups = async () => {
        try {
          const data = await getSearchRanking();
          setSearchRank(data);
          console.log("실시간 검색어 조회완료");
        } catch (error) {
          console.error("Failed to load popups");
        }
      };
  
      fetchPopups();

      
    }, []);
  
    
    {/* 순위 변동 아이콘 */}
    const getStatusIcon = (status) => {
      if (status === 'up') return '🔺';
      if (status === 'down') return '🔹';
      return '⏤';
    };
  
    return (
      
      <div className="ranking-container">
        <div className="ranking-header">01.20 00:00 기준</div>
        <div className="ranking-grid">
          
          {/* 1 ~ 5등 까지 인기 검색 순위 */}
          <div>
            {searchRank.slice(0, 5).map((item) => (
              <div
                key={item.rank}
                className="ranking-item"
                onClick={() => handleSearchClick(item.keyword)}
              >
                <span className="ranking-name">{item.rank} {item.keyword}</span>
                <span className="ranking-status">{getStatusIcon('up')}</span>
              </div>
            ))}
          </div>

           {/* 6 ~ 10등 까지 인기 검색 순위 */}
          <div>
            {searchRank.slice(5).map((item) => (
              <div
                key={item.rank}
                className="ranking-item"
              >
                <span className="ranking-name">{item.rank} {item.keyword}</span>
                <span className="ranking-status">{getStatusIcon('up')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default RankingList;