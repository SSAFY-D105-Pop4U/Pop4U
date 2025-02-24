import ReviewScore from "./ReviewScore";
import ReviewChart from "./ReviewChart";
import ReviewItem from "./ReviewItem";


const Review = ({ reviews }) => {

    // 별점정보만 추출
    const reviewRatings = reviews.map((review) => review.reviewRating);

  return (
    <>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-around",
          alignItems: "center",
          marginLeft:"35px" 
        }}
      >
        <ReviewScore reviewRatings={reviewRatings} />
        <ReviewChart reviewRatings={reviewRatings}/>
      </div>
      <div>
        <div
          style={{ width: "100%", height: "100%", border: "1px #EFEFF0 solid", marginBottom:"10px"}}
        ></div>
        <ReviewItem reviews = {reviews}/>
      </div>
    </>
  );
};

export default Review;
