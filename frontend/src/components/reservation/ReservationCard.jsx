import '../../styles/components/ReservationCard.css'

const ReservationCard = () => {
    return (
        <div>
<div className="reservation-card-container">
      <div className="reservation-card-header">
        <img
          src="https://d8nffddmkwqeq.cloudfront.net/store/41e90e0e%2C905a%2C4601%2C93e5%2Cbf8b5aa99d7a"
          alt="마루는 강쥐 이벤트 이미지"
          className="reservation-card-image"
        />
      </div>
      <div className="reservation-card-content">
        <h2 className='reservation-card-title'>
          <span>&lt;마루는 강쥐&gt;</span> X 롯데월드 ‘마루의 럭키 NEW YEAR’
        </h2>
        <p>서울 강서구 마곡동</p>
        <div className="reservation-card-details">
          <div>
            <strong>예약일</strong>
            <p>01.22 (수)</p>
          </div>
          <div>
            <strong>예약시간</strong>
            <p>14:00</p>
          </div>
          <div>
            <strong>인원</strong>
            <p>성인 2</p>
          </div>
          <div>
            <strong>대기 번호</strong>
            <p>15</p>
          </div>
        </div>
        <div className="reservation-card-footer">
          <p>순서: 20번째</p>
          <p>예상 대기 시간: 20분</p>
        </div>
      </div>
    </div>
        </div>
    )

}
 
export default ReservationCard

