import '../../styles/components/RankingList.css';
import { useEffect, useState } from "react";

import { getSearchRanking } from "../../apis/api/api.js";
import searchUp from "../../assets/icons/search-up.png"
import searchDown from "../../assets/icons/search-down.png"
import searcNeutral from '../../assets/icons/search-neutral.png'



  

const RankingList = ({onClickSearch, setOnClickSearch}) => {
  const [searchRank, setSearchRank] = useState([]);
  const [updateTime, setUpdateTime] = useState("");

  const handleSearchClick = (col) => {
    console.log(col);
    setOnClickSearch(col);
  };
  
  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const response = await getSearchRanking();
        setSearchRank(response.rankings);  // 여기를 수정
        setUpdateTime(response.updateTime);
        console.log("실시간 검색어 조회완료");
        console.log(response.rankings);
      } catch (error) {
        console.error("Failed to load popups");
      }
    };

    fetchPopups();
  }, []);
    
  const getStatusIcon = (status) => {
    if (status === 'up') return '🔺';
    if (status === 'down') return '🔹';
    return '⏤';
  };

  return (
    <div className="ranking-container">
      <div className="ranking-header">{updateTime}</div>
      <div className="ranking-grid">
        <div>
        {(searchRank || []).slice(0, 5).map((item) => (
  <div
    key={item.rank}
    className="ranking-item"
    onClick={() => handleSearchClick(item.keyword)}
  >
    <span className="ranking-name">{item.rank} {item.keyword}</span>
    {((item.status)=="up")&&(<span className="ranking-status"><img src= {searchUp}/> </span>)}
    {((item.status)=="down")&&(<span className="ranking-status"><img src= {searchDown}/> </span>)}
    {((item.status)=="neutral")&&(<span className="ranking-status"><img src= {searcNeutral}/> </span>)}
    
  </div>
))}
        </div>
        <div>
        {(searchRank || []).slice(5).map((item) => (
  <div
    key={item.rank}
    className="ranking-item"
    onClick={() => handleSearchClick(item.keyword)}
  >
    <span className="ranking-name">{item.rank} {item.keyword}</span>
    <span className="ranking-status">{getStatusIcon(item.status)}</span>
  </div>
))}
        </div>
      </div>
    </div>
  );
};
  
  export default RankingList;