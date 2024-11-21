import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
import getMPTheme from "./theme/getMPTheme";

interface TemplateFrameProps {
    mode: PaletteMode;
    children: React.ReactNode;
}

export default function TemplateFrame({
    mode,

    children,
}: TemplateFrameProps) {
    const MPTheme = createTheme(getMPTheme(mode));

    return (
        <ThemeProvider theme={MPTheme}>
            <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
                <Box sx={{ flex: "1 1", overflow: "auto" }}>{children}</Box>
            </Box>
        </ThemeProvider>
    );
}
