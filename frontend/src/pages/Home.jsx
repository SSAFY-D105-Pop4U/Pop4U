import HomeHeader from "../components/HomeHeader";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <div className="header">
        <HomeHeader />
        <h2>
          팝업 스토어
          <br />
          어디로 가볼까요?
        </h2>
      </div>
    </div>
  );
};

export default Home;
