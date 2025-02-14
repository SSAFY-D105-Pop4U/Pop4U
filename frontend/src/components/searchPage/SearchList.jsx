import '../../styles/components/SearchList.css'
import Divider from '../basic/Divider'
import { useEffect, useState } from "react";
import { getSearch } from "../../apis/api/api.js";
import { useNavigate } from "react-router-dom";

const SearchList = ({searchQuery}) => {
  const [searchData, setsearchData] = useState([]);

  const nav = useNavigate();
  const handleCardClick = (index) => {
    nav(`/detail?popupId=${index}`);
  };
  
  const handleOnClick = (query) => {
    console.log(query);
    
    handleCardClick
  }; 
    
    useEffect(() => {
      console.log("searchQuery 값:",searchQuery);
      {/* 인기 검색어 조회 api 호출 */}
        const fetchPopups = async () => {
          try {
            
            
            const data = await getSearch(searchQuery);
            setsearchData(data);
            
          } catch (error) {
            console.error("Failed to load popups");
          }
        };
    
        fetchPopups();
  
        
      }, [searchQuery]);

    return (
        
        <div className="search-results">
          {searchData.map((result, index) => (
            <div onClick={()=>handleCardClick(result.popupId)}>
               
            <div className="result-item" key={index}>
              <img src={result.popupImages[0]} alt={result.popupName} className="result-image" />
              <div className="result-info">
                <h3 className="result-title">{result.popupName}</h3>
                <p className="result-time">{result.popupOperationTime}</p>
              </div>
            </div>
            <Divider height="2  px" top="10px" bottom="10px" />
            </div>
          ))}
        </div>
       
    )

}

export default SearchList

