import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "ProTip";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://ybminm.me/">
        ybminm
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const HomePage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Tekken Everyday Site
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default HomePage;
