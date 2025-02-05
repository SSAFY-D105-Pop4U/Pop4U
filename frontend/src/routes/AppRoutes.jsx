import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import SocialLogin from "../pages/SocialLogin";
import Login from "../pages/Login";

const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/SocialLogin" element={<SocialLogin />} />
        </Routes>

    );
};

export default AppRoutes;
