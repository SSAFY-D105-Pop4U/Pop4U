import '../../styles/components/SearchBar.css'
import searchIcon from '../../assets/icons/search.png'
import BackButton from "../../components/BackButton";
const SearchBar = ({ onSearch }) => {
    const handleInputChange = (event) => {
        onSearch(event.target.value); // 부모로 검색어 전달
      };
    return (
        <div className='search-container'>
         <BackButton/>   
         
    <div className="search-bar">
      
    <img src={searchIcon} alt="search" className="search-icon" />
      <input
        type="text"
        placeholder="검색하기"
        className="search-input"
        onChange={handleInputChange} // 입력 값이 변경될 때 호출
      />
      
    </div>

        </div>
    )

}

export default SearchBar

