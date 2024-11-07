import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "utils/auth";
import { BackEndUrl } from "utils/loadEnv";

function LoginCallback() {
  // 쿼리 파라미터를 가져오기 위한 useLocation 훅 사용
  const location = useLocation();
  const navigate = useNavigate();
  const { saveToken, saveUser } = useAuth();

  // 쿼리 파라미터를 URLSearchParams로 파싱
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("access_token"); // 'access_token' 쿼리 파라미터 값 읽기

  useEffect(() => {
    if (token) {
      saveToken(token); // 토큰을 저장
      console.log("Received token:", token);

      const fetchUserData = async () => {
        try {
          console.log("Token is found");
          const response = await axios(`${BackEndUrl}/users/me`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          });
          if (response.status !== 200) {
            throw new Error("Failed to fetch user data");
          }
          const user = response.data;
          saveUser(user); // 사용자 정보 저장
        } catch (error) {
          alert("Failed to fetch user data");
          navigate("/signin");
        }
      };
      fetchUserData();
      navigate("/"); // 홈 페이지로 리다이렉트
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div>
      <h1>Authentication Successful</h1>
      <p>Your token is: {token}</p>
    </div>
  );
}

export default LoginCallback;
