import backIcon from "../../assets/icons/back.svg";
import "../../styles/components/Header.css";
import BackButton from "../../components/BackButton";
const Header = ({ title }) => {
  return (
    <div className="header">
      <BackButton />
      <h2 className="header1">{title}</h2>
    </div>
  );
};

export default Header;
