import { createContext, useContext, useState } from "react";

type AuthContextType = {
  nickname: string | null;
  email: string | null;
  steam_id: string | null;
  tekken_id: string | null;
  kakao_id: string | null;
  token: string | null;
  saveToken: (userToken: string) => void;
  saveUser: (user: any) => void;
  removeToken: () => void;
  removeUser: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const [nickname, setNickname] = useState(sessionStorage.getItem("nickname"));
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [steam_id, setSteamId] = useState(sessionStorage.getItem("steam_id"));
  const [tekken_id, setTekkenId] = useState(
    sessionStorage.getItem("tekken_id")
  );
  const [kakao_id, setKakaoId] = useState(sessionStorage.getItem("kakao_id"));
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const saveToken = (userToken: string) => {
    sessionStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const saveUser = (user: any) => {
    sessionStorage.setItem("nickname", user.nickname);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("steam_id", user.steam_id);
    // sessionStorage.setItem("tekken_id", user.tekken_id);
    sessionStorage.setItem("kakao_id", user.kakao_id);
    setNickname(user.nickname);
    setEmail(user.email);
    setSteamId(user.steam_id);
    // setTekkenId(user.tekken_id);
    setKakaoId(user.kakao_id);
  };

  const removeUser = () => {
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("steam_id");
    sessionStorage.removeItem("tekken_id");
    sessionStorage.removeItem("kakao_id");
    setNickname(null);
    setEmail(null);
    setSteamId(null);
    setTekkenId(null);
    setKakaoId(null);
  };

  const removeToken = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        nickname,
        email,
        kakao_id,
        tekken_id,
        steam_id,
        token,
        saveToken,
        removeToken,
        saveUser,
        removeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
