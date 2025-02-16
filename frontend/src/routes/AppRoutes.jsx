import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SocialLogin from "../pages/SocialLogin";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Detail from "../pages/Detail";
import WriteReview from "../pages/WriteReview";
import AreaList from "../pages/AreaList";
import Search from "../pages/Search";
import Appointment from "../pages/Appointment";
import Reservation from "../pages/Reservation";
import UserCategory from "../pages/UserCategory";
import Recheck from "../pages/Recheck";
import NewPopupList from "../pages/NewPopupList";
import EndingPopupList from "../pages/EndingPopupList";
import TrendingPopupList from "../pages/TrendingPopupList";
import ReviewLifeShot from "../pages/ReviewLifeShot";
import Chat from "../pages/Chat";
import TowHome from "../pages/TowHome"; 
import TestLifeShot from "../pages/new/LifeShot"
import Creategame from "../pages/Creategame"
import LifeShot from "../pages/LifeShot";
import Game from "../pages/Game"



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />             
      <Route path="/home" element={<Home />} />
      <Route path="/sociallogin" element={<SocialLogin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/writereview" element={<WriteReview />} />
      <Route path="/arealist" element={<AreaList />} />
      <Route path="/search" element={<Search />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/usercategory" element={<UserCategory />} />

      <Route path="/newpopups" element={<NewPopupList />} />
      <Route path="/endingpopups" element={<EndingPopupList />} />
      <Route path="/trendingpopups" element={<TrendingPopupList />} />
      
      <Route path="/recheck" element={<Recheck />} />
      <Route path="/reviewlifeshot" element={<ReviewLifeShot />} />
      <Route path="/chat" element={<Chat />} />
      
      <Route path="/lifeshot" element={<LifeShot />} />

      <Route path="/twohome" element={<TowHome />} /> 
      <Route path="/testlife" element={<TestLifeShot />} /> 
      <Route path="/creategame" element={<Creategame />} />
      <Route path="/game/Event_Game/:popupId" element={<Game />} />
      

      
    </Routes>
  );
};

export default AppRoutes;
