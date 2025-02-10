import '../../styles/components/Recheck.css'

const Recheck = ({ title, people, date }) => {
    return (
      <div className="recheck-container">
        <div className="recheck-item">
          <span className="recheck-label">팝업명</span>
          <span className="recheck-value">{title}</span>
        </div>
        <div className="recheck-item">
          <span className="recheck-label">인원</span>
          <span className="recheck-value">{people}명</span>
        </div>
        <div className="recheck-item">
          <span className="recheck-label">날짜</span>
          <span className="recheck-value">{date}</span>
          
        </div>
        <div className="recheck-item">
          <span className="recheck-label">시간</span>
          <span className="recheck-value">{title}</span>
        </div>
      </div>
    );
  };
  
  export default Recheck;