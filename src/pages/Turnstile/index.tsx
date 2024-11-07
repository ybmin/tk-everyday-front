import { useNavigate } from "react-router-dom";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef } from "react";

const TurnstilePage = () => {
  const navigate = useNavigate();
  const ref = useRef<TurnstileInstance | undefined>();
  const siteKey = "0x4AAAAAAAxsaACzNznlDZtk";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#222222",
        color: "#ffffff",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <span
        style={{
          flex: 1,
          fontSize: 24,
          margin: 10,
          paddingTop: 20,
        }}
      >
        Tekken EveryDay 로 리다이렉트 중입니다.
      </span>
      <div style={{ flex: 1 }}>
        <span
          style={{
            fontSize: 16,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          로봇 및 적합하지 않은 접속을 검사합니다.
        </span>
        <Turnstile
          ref={ref}
          options={{ refreshExpired: "manual" }}
          siteKey={siteKey}
          onSuccess={(token) => {
            sessionStorage.setItem("turnstile", token); // 세션 토큰 저장
            navigate("/");
          }}
          onError={() => {
            sessionStorage.removeItem("turnstile");
          }}
          onAbort={() => {
            sessionStorage.removeItem("turnstile");
          }}
          onExpire={() => {
            sessionStorage.removeItem("turnstile");
            ref.current?.reset();
          }}
        />
      </div>
    </div>
  );
};

export default TurnstilePage;
