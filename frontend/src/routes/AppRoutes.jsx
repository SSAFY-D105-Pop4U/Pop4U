import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SocialLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
