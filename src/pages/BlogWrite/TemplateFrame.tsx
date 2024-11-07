import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
import getBlogTheme from "./theme/getBlogTheme";

// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   position: "relative",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   flexShrink: 0,
//   borderBottom: "1px solid",
//   borderColor: theme.palette.divider,
//   backgroundColor: theme.palette.background.paper,
//   boxShadow: "none",
//   backgroundImage: "none",
//   zIndex: theme.zIndex.drawer + 1,
//   flex: "0 0 auto",
// }));

interface TemplateFrameProps {
  showCustomTheme: boolean;
  toggleCustomTheme: (theme: boolean) => void;
  mode: PaletteMode;
  toggleColorMode: () => void;
  children: React.ReactNode;
}

export default function TemplateFrame({
  showCustomTheme,
  toggleCustomTheme,
  mode,
  toggleColorMode,
  children,
}: TemplateFrameProps) {
  const blogTheme = createTheme(getBlogTheme(mode));

  return (
    <ThemeProvider theme={blogTheme}>
      <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: "1 1", overflow: "auto" }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}
