import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "utils/auth";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { styled } from "@mui/system";
import { Theme } from "@mui/material/styles";
import theme from "constants/theme";

const drawerWidth = 240;

const DashboardLayout = styled("div")(({ theme }) => ({
  display: "flex",
}));

const AppBarStyled = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));
const ProfilesPage = () => {
  const { token, email, kakao_id, steam_id, tekken_id, nickname } = useAuth();
  const [user, setUser] = useState({} as any);

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // 프로필 이미지 상태
  // const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png");

  // 입력값 변경 핸들러
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser((prevProfile: any) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 서버로 전송하거나 API 호출을 여기서 처리
    console.log("Updated Profile:", user);
  };

  const dashboardData = {
    totalMatches: 120,
    winRate: "75%",
    favoriteCharacter: "Hwoarang",
    totalTimePlayed: "200 hours",
    steamRanking: "Gold",
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Token is found");
        const response = await axios("http://localhost:8000/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        if (response.status !== 200) {
          throw new Error("Failed to fetch user data");
        }
        setUser(response.data);
      } catch (error) {
        alert("Failed to fetch user data");
        navigate("/signin");
      }
    };
    if (token && !email) {
      fetchUserData();
    } else if (token && email) {
      setUser({
        email: email,
        kakao_id: kakao_id,
        steam_id: steam_id,
        tekken_id: tekken_id,
        nickname: nickname,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, email]);

  return (
    <DashboardLayout>
      <CssBaseline />
      <AppBarStyled position="absolute" theme={theme}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{ marginRight: "36px" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Profile & Dashboard
          </Typography>
        </Toolbar>
      </AppBarStyled>

      <DrawerStyled variant="permanent" open={open}>
        <Toolbar />
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </DrawerStyled>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          padding: 3,
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* 프로필 관리 섹션 */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Manage Profile
                </Typography>
                <Avatar
                  alt="Profile Avatar"
                  src="/default-avatar.png"
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Nickname"
                    name="nickname"
                    variant="outlined"
                    value={user.nickname}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={user.email}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Kakao ID"
                    name="kakao_id"
                    variant="outlined"
                    value={user.kakao_id}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Tekken ID"
                    name="tekken_id"
                    variant="outlined"
                    value={user.tekken_id}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Steam ID"
                    name="steam_id"
                    variant="outlined"
                    value={user.steam_id}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    value={user.password}
                    onChange={handleChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Save Changes
                  </Button>
                </form>
              </Paper>
            </Grid>

            {/* 대시보드 섹션 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Dashboard
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Total Matches</Typography>
                        <Typography variant="h4">
                          {dashboardData.totalMatches}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Win Rate</Typography>
                        <Typography variant="h4">
                          {dashboardData.winRate}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Favorite Character</Typography>
                        <Typography variant="h4">
                          {dashboardData.favoriteCharacter}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Total Time Played</Typography>
                        <Typography variant="h4">
                          {dashboardData.totalTimePlayed}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default ProfilesPage;
