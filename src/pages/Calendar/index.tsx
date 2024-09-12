import { useState } from "react";
import Calendar from "react-calendar";
import "./style.css";
import {
  AppBar,
  Box,
  Button,
  createTheme,
  CssBaseline,
  IconButton,
  styled,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  flex: "0 0 auto",
}));

const CalendarPage = () => {
  const defaultTheme = createTheme({ palette: { mode: "dark" } });
  const [selectedDate, setSelectedDate] = useState<
    Date | null | [Date | null, Date | null]
  >(new Date());
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Box
          sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}
        >
          <StyledAppBar>
            <Toolbar
              variant="dense"
              disableGutters
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                p: "8px 12px",
              }}
            >
              <Button
                variant="text"
                size="small"
                aria-label="이전으로"
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                이전으로
              </Button>
              <IconButton
                size="small"
                aria-label="이전으로"
                component="a"
                href="/"
                sx={{ display: { xs: "auto", sm: "none" } }}
              >
                <ArrowBackRoundedIcon />
              </IconButton>
            </Toolbar>
          </StyledAppBar>
          <Box sx={{ flex: "1 1", overflow: "auto" }}>
            <ThemeProvider theme={defaultTheme}>
              <CssBaseline enableColorScheme />
              <h1>Calendar</h1>
              <Calendar
                locale="ko-KR"
                onChange={setSelectedDate}
                value={selectedDate}
              />
            </ThemeProvider>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default CalendarPage;
