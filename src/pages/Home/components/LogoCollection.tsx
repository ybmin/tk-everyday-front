import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";
import { SitemarkIcon } from "./SitemarkIcon";
import { YbminmLogo } from "./YbminmLogo";
import { CloudflareLogo } from "./CloudflareLogo";
import { OracleLogo } from "./OracleLogo";
import { BandaiNamcoLogo } from "./BandaiNamcoLogo";

const whiteLogos = [
  SitemarkIcon,
  YbminmLogo,
  CloudflareLogo,
  OracleLogo,
  BandaiNamcoLogo,
];

const darkLogos = [
  SitemarkIcon,
  YbminmLogo,
  CloudflareLogo,
  OracleLogo,
  BandaiNamcoLogo,
];

const logoStyle = {
  width: "100px",
  height: "80px",
  margin: "0 32px",
  opacity: 0.7,
  padding: "5 10px",
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        sx={{ color: "text.secondary" }}
      >
        제작 및 유지보수에 도움이 된 서비스 및 개발자
      </Typography>
      <Grid
        container
        sx={{
          justifyContent: "center",
          mt: 0.5,
          opacity: 0.6,
          alignItems: "center",
          gap: 6,
          paddingTop: 2,
        }}
      >
        {logos.map((logo, index) => (
          <Grid item key={index}>
            {React.createElement(logo, { style: logoStyle })}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
