import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import CalendarPage from "pages/Calendar";
import DashboardPage from "pages/Dashboard";
import EventsPage from "pages/Events";
import HomePage from "pages/Home";
import SignupPage from "pages/Signup";
import ProfilesPage from "pages/Profiles";
import SigninPage from "pages/Signin";
import AdminPage from "pages/Admin";
// import LoginCallback from "pages/LoginCallback";
import BlogPage from "pages/Blog";
import { useEffect, useState } from "react";
import axios from "axios";
import TurnstilePage from "pages/Turnstile";
import BlogWritePage from "pages/BlogWrite";

const SpecificRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // useEffect(() => {
  //   const validate = async () => {
  //     const token = sessionStorage.getItem("turnstile");
  //     if (token) {
  //       try {
  //         const response = await axios.post(
  //           "http://localhost:8000/verify-turnstile",
  //           { token: token },
  //           {
  //             headers: { "Content-Type": "application/json" },
  //           }
  //         );
  //         if (response.data.success) {
  //           setIsAuthenticated(true);
  //         } else {
  //           setIsAuthenticated(false);
  //           sessionStorage.removeItem("turnstile");
  //         }
  //       } catch (error) {
  //         setIsAuthenticated(false);
  //         sessionStorage.removeItem("turnstile");
  //       }
  //     }
  //   };
  //   validate();
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/turnstile" element={<TurnstilePage />} />
        {/* 클랜 소개 static page */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomePage />
            ) : (
              <Navigate replace to="/turnstile" />
            )
          }
        />
        {/* admin page 클랜장 관리 페이지 */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminPage />
            ) : (
              <Navigate replace to="/turnstile" />
            )
          }
        />
        {/* 클랜원들 계정 가능하게 */}
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate replace to="/turnstile" />
            )
          }
        />
        <Route
          path="/signin"
          element={
            isAuthenticated ? (
              <SigninPage />
            ) : (
              <Navigate replace to="/turnstile" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <ProfilesPage />
            ) : (
              <Navigate replace to="/turnstile" />
            )
          }
        />
        {/* <Route path="/login" element={<LoginCallback />} /> */}
        {/* rating  계급 가져오는거 + cron으로 00:00 업데이트, 1달 내 차이점 요약 */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardPage />
            ) : (
              <Navigate replace to="/turnstile" />
            )
          }
        />
        {/* 캘린더 (admin 편집 가능) */}
        {/* https://mui.com/x/react-date-pickers/date-calendar/ */}
        <Route
          path="/calendar"
          element={
            isAuthenticated ? (
              <CalendarPage />
            ) : (
              <Navigate replace to="/turnstile" />
            )
          }
        />
        {/* 이벤트 이력 볼 수 있는 스크린 */}
        <Route
          path="/events"
          element={
            isAuthenticated ? (
              <EventsPage />
            ) : (
              <Navigate replace to="/turnstile" />
            )
          }
        />
        {/* TODO: 회의록 보는 페이지 + 회의 안건 추가 */}
        {/* TODO: 클랜 단체 계좌 내역 공유 (아마 수기로 해야할 듯) */}
        {/* TODO: 정보 사이트 공개적으로 올려서 많은 사람들이 볼 수 있는 거 */}
        <Route
          path="/blogs"
          element={
            isAuthenticated ? (
              <BlogPage />
            ) : (
              <Navigate replace to="/turnstile" />
            )
          }
        />
        {/* TODO: (추후) 인턴 관리 */}
        <Route
          path="/blogs/write"
          element={
            isAuthenticated ? (
              <BlogWritePage />
            ) : (
              <Navigate replace to="/turnstile" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default SpecificRouter;
