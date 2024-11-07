import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import getSignUpTheme from "./theme/getSignUpTheme";
import { SitemarkIcon, KakaoIcon } from "./CustomIcons";
import TemplateFrame from "./TemplateFrame";
import { PaletteMode } from "@mui/material";
import axios from "axios";
import { BackEndUrl } from "utils/loadEnv";

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

export default function SignupPage() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await axios.post(`${BackEndUrl}/register`, {
        email: data.get("email"),
        nickname: data.get("nickname"),
        password: data.get("password"),
      });
      alert("Registration successful!");
      // 회원가입 성공 시 로그인 페이지로 이동
      window.location.href = "/login";
    } catch (error: any) {
      alert("Registration failed. " + error.response.data.detail);
    }
  };

  const handleKakaoLogin = () => {
    // 백엔드에서 카카오 로그인 URL로 리다이렉트
    window.location.href = `${BackEndUrl}/auth/kakao`;
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
                {/* <FormControl>
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
                    color={passwordError ? "error" : "primary"}
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
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="이메일로 변경사항에 대한 업데이트를 받겠습니다."
                />
                <Button
                type="submit"
                fullWidth
                  variant="contained"
                  onClick={validateInputs}
                  >
                  가입하기
                  </Button> */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    style={{ backgroundColor: "#FFEB00", color: "#3C1E1E" }}
                    onClick={handleKakaoLogin}
                    startIcon={<KakaoIcon />}
                  >
                    카카오로 가입하기
                  </Button>
                </Box>
                <Divider>
                  <Typography sx={{ color: "text.secondary" }}>or</Typography>
                </Divider>
                <Typography sx={{ textAlign: "center" }}>
                  이미 계정이 있으신가요?{" "}
                  <span>
                    <Link
                      href="/signin"
                      variant="body2"
                      sx={{ alignSelf: "center" }}
                    >
                      로그인
                    </Link>
                  </span>
                </Typography>
              </Box>
            </Card>
          </Stack>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
