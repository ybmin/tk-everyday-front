import { Route, Routes, BrowserRouter } from "react-router-dom";

import CalendarPage from "pages/Calendar";
import DashboardPage from "pages/Dashboard";
import EventsPage from "pages/Events";
import HomePage from "pages/Home";
import SignupPage from "pages/Signup";
import ProfilesPage from "pages/Profiles";
import SigninPage from "pages/Signin";
import AdminPage from "pages/Admin";

const SpecificRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 클랜 소개 static page */}
        <Route path="/" element={<HomePage />} />
        {/* admin page 클랜장 관리 페이지 */}
        <Route path="/admin" element={<AdminPage />} />
        {/* 클랜원들 계정 가능하게 */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/profile" element={<ProfilesPage />} />
        {/* rating  계급 가져오는거 + cron으로 00:00 업데이트, 1달 내 차이점 요약 */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* 캘린더 (admin 편집 가능) */}
        {/* https://mui.com/x/react-date-pickers/date-calendar/ */}
        <Route path="/calendar" element={<CalendarPage />} />
        {/* 이벤트 이력 볼 수 있는 스크린 */}
        <Route path="/events" element={<EventsPage />} />
        {/* TODO: 회의록 보는 페이지 + 회의 안건 추가 */}
        {/* TODO: 클랜 단체 계좌 내역 공유 (아마 수기로 해야할 듯) */}
        {/* TODO: 정보 사이트 공개적으로 올려서 많은 사람들이 볼 수 있는 거 */}
        {/* TODO: (추후) 인턴 관리 */}
      </Routes>
    </BrowserRouter>
  );
};

export default SpecificRouter;
