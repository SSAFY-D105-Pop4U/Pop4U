import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import SocialLogin from "../pages/SocialLogin";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/socialLogin" element={<SocialLogin />} />
            <Route path="/signup" element={<Signup />} />

        </Routes>

    );
};

export default AppRoutes;
