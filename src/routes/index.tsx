import DashboardPage from "pages/Dashboard";
import EventsPage from "pages/Events";
import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import ProfilesPage from "pages/Profiles";
import SigninPage from "pages/Signin";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const SpecificRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilesPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SpecificRouter;
