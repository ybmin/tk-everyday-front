import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";
import { SitemarkIcon, KakaoIcon, SteamIcon } from "./CustomIcons";
import TemplateFrame from "./TemplateFrame";
import { PaletteMode } from "@mui/material";
import axios from "axios";
import { BackEndUrl } from "utils/loadEnv";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "utils/auth";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: 4,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SigninNewPage() {
  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode") as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const name = document.getElementById("nickname") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("이메일 주소를 입력해 주세요.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("비밀번호는 6자 이상이어야 합니다.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("닉네임이 필요합니다.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("access_token"); // 'access_token' 쿼리 파라미터 값 읽기
    saveToken(token?.toString() || "");
    try {
      const polaris_id = data.get("polaris_id");
      if (!polaris_id) {
        const response = await axios(`${BackEndUrl}/auth/link/email`, {
          data: {
            email: data.get("email")?.toString(),
            nickname: data.get("nickname")?.toString(),
            password: data.get("password")?.toString(),
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      } else {
        const response = await axios(`${BackEndUrl}/auth/link/email`, {
          data: {
            email: data.get("email")?.toString(),
            nickname: data.get("nickname")?.toString(),
            password: data.get("password")?.toString(),
            polaris_id: data.get("polaris_id")?.toString(),
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      }
      alert("Registration successful!");
      // 회원가입 성공 시 로그인 페이지로 이동
      window.location.href = "/login";
    } catch (error: any) {
      alert("Registration failed. " + error.response.data.detail);
    }
  };

  const handleSteamLogin = () => {
    // 쿼리 파라미터를 URLSearchParams로 파싱
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("access_token"); // 'access_token' 쿼리 파라미터 값 읽기
    saveToken(token?.toString() || "");
    const steamLoginWindow = window.open(
      `${BackEndUrl}/auth/steam?access_token=${token}`,
      "Steam Login",
      "width=800,height=600"
    );
    steamLoginWindow?.focus();
  };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
        <CssBaseline enableColorScheme />

        <SignUpContainer direction="column" justifyContent="space-between">
          <Stack
            sx={{
              justifyContent: "center",
              height: "100dvh",
              p: 2,
            }}
          >
            <Card variant="outlined">
              <SitemarkIcon />
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                회원 가입
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Typography variant="body2" color="InfoText">
                  아래 정보를 추가하여 회원가입 완료!
                </Typography>
                <FormControl>
                  <FormLabel htmlFor="nickname">닉네임</FormLabel>
                  <TextField
                    autoComplete="nickname"
                    name="nickname"
                    required
                    fullWidth
                    id="nickname"
                    placeholder="EveryDay"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    error={emailError}
                    helperText={emailErrorMessage}
                    color={emailError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">비밀번호</FormLabel>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    variant="outlined"
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    color={passwordError ? "error" : "primary"}
                  />
                </FormControl>
                <Divider>
                  <Typography variant="h5" color="InfoText">
                    철권 계정 연동 (옵션)
                  </Typography>
                </Divider>
                <Typography variant="body1" color="InfoText">
                  철권 polaris id를 입력하고, 스팀 로그인을 통해 본인 인증
                  하세요!{"\n"}인증을 진행한 유저에겐 인증 배지가 부여됩니다.
                </Typography>
                <FormControl>
                  <FormLabel htmlFor="polaris_id">
                    철권 ID (Polaris ID)
                  </FormLabel>
                  <TextField
                    required
                    fullWidth
                    id="polaris_id"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    name="polaris_id"
                    variant="outlined"
                    error={emailError}
                    helperText={emailErrorMessage}
                    color={passwordError ? "error" : "primary"}
                  />
                </FormControl>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    style={{ backgroundColor: "black", color: "whitesmoke" }}
                    onClick={handleSteamLogin}
                    startIcon={<SteamIcon />}
                  >
                    Steam 로그인
                  </Button>
                </Box>
                <Divider />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={validateInputs}
                >
                  가입하기
                </Button>
              </Box>
            </Card>
          </Stack>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
