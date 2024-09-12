import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function KakaoCallback() {
  const location = useLocation();

  useEffect(() => {
    const fetchKakaoToken = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");

        const response = await axios.get(
          `http://localhost:8000/auth/kakao/callback?code=${code}`
        );

        alert("Kakao Login/Register successful!");
        localStorage.setItem("token", response.data.access_token);
        window.location.href = "/";
      } catch (error) {
        alert("Kakao Login/Register failed.");
      }
    };

    fetchKakaoToken();
  }, [location]);

  return <div>Processing Kakao login/register...</div>;
}

export default KakaoCallback;
