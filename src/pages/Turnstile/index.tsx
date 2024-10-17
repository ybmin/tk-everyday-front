import { useNavigate } from "react-router-dom";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef } from "react";

const TurnstilePage = () => {
  const navigate = useNavigate();
  const ref = useRef<TurnstileInstance | undefined>();
  const siteKey = "0x4AAAAAAAxsaACzNznlDZtk";

  return (
    <div>
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
  );
};

export default TurnstilePage;
