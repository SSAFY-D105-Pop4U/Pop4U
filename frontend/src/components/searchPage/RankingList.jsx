import '../../styles/components/RankingList.css';

const RankingList = () => {
    const rankings = [
      { rank: 1, name: '오징어 게임', status: 'up' },
      { rank: 2, name: '빵빵이', status: 'up' },
      { rank: 3, name: '더현대', status: 'down' },
      { rank: 4, name: '키즈', status: 'up' },
      { rank: 5, name: '오징어 게임', status: 'up' },
      { rank: 6, name: '신세계 백화점', status: 'neutral' },
      { rank: 7, name: '패션', status: 'up' },
      { rank: 8, name: '이벤트', status: 'down' },
      { rank: 9, name: '전시', status: 'neutral' },
      { rank: 10, name: '데이트', status: 'up' },
    ];
  
    const getStatusIcon = (status) => {
      if (status === 'up') return '🔺';
      if (status === 'down') return '🔹';
      return '⏤';
    };
  
    return (
      <div className="ranking-container">
        <div className="ranking-header">01.20 00:00 기준</div>
        <div className="ranking-grid">
          <div>
            {rankings.slice(0, 5).map((item) => (
              <div
                key={item.rank}
                className="ranking-item"
              >
                <span className="ranking-name">{item.rank} {item.name}</span>
                <span className="ranking-status">{getStatusIcon(item.status)}</span>
              </div>
            ))}
          </div>
          <div>
            {rankings.slice(5).map((item) => (
              <div
                key={item.rank}
                className="ranking-item"
              >
                <span className="ranking-name">{item.rank} {item.name}</span>
                <span className="ranking-status">{getStatusIcon(item.status)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default RankingList;