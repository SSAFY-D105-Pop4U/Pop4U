import '../../styles/components/SearchList.css'
import Divider from '../basic/Divider'
import { useEffect, useState } from "react";
import { getSearch } from "../../apis/api/api.js";

const SearchList = ({searchQuery}) => {
  const [searchData, setsearchData] = useState([]);
    
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


    const searchResults = [
        {
          title: "2025 아이파크몰 키보드 페스티벌",
          time: "11:00 ~ 20:00",
          image: "https://d8nffddmkwqeq.cloudfront.net/store/46798713%2C0c53%2C4b22%2Ca60d%2C447074851f7f", // Replace with actual image URLs
        },
        {
          title: "캡틴 아메리카 : 브레이브 뉴 월드asdfasdfsaf",
          time: "11:00 ~ 20:00",
          image: "https://d8nffddmkwqeq.cloudfront.net/store/46798713%2C0c53%2C4b22%2Ca60d%2C447074851f7f",
        },
      ];
    return (
        
        <div className="search-results">
          {searchData.map((result, index) => (
            <div>
               
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

