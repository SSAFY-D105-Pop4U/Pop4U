import Divider from "../components/basic/Divider";
import Header from "../components/basic/Header";
import LifeShotFrame from "../components/lifeShotPage/LifeShotFrame";
import ShotToggleButton from "../components/lifeShotPage/ShotToggleButton";
import '../styles/pages/LifeShot.css';

const LifeShot = () => {

  
  

  return (
    <div className="lifeshot-page">
      <Header title={"인생네컷 제작"}/>
      <LifeShotFrame />
      
     
      <ShotToggleButton/>
    </div>
  );
};

export default LifeShot;
