import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import SocialLogin from "../pages/SocialLogin";
const AppRoutes = () => {
    return (

        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<SocialLogin />} />
        </Routes>

    );
};

export default AppRoutes;
