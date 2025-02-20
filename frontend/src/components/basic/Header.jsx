import backIcon from "../../assets/icons/back.svg";
import "../../styles/components/Header.css";
import BackToHomeButton from "../../components/BackTohomeButton";

const Header = ({ title }) => {
  return (
    <div className="header">
      <BackToHomeButton />
      <h2 className="header1">{title}</h2>
    </div>
  );
};

export default Header;
