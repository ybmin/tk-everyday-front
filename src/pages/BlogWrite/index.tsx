import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  PaletteMode,
  Select,
  TextField,
} from "@mui/material";
import AppAppBar from "./components/AppAppBar";
import TemplateFrame from "./TemplateFrame";

import { MDXEditorMethods } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import getBlogTheme from "./theme/getBlogTheme";
import { TekkenMarkdownEditor } from "./components/Editor";
import { useAuth } from "utils/auth";
import axios from "axios";
import { BackEndUrl } from "utils/loadEnv";

export default function BlogWritePage() {
  const [mode] = React.useState<PaletteMode>("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");

  React.useEffect(() => {
    const temp_md = localStorage.getItem("temp_md");
    const temp_title = localStorage.getItem("temp_title");
    const temp_category = localStorage.getItem("temp_category");
    if (temp_md && temp_title && temp_category) {
      setTitle(temp_title);
      setCategory(temp_category);
      ref.current?.setMarkdown(temp_md);
    }
  }, []);

  const { token } = useAuth();
  // This code only runs on the client side, to determine the system color preference
  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  const ref = React.useRef<MDXEditorMethods>(null);

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={"dark"}
      toggleColorMode={toggleCustomTheme}
    >
      <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
        <CssBaseline enableColorScheme />

        <AppAppBar />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
        >
          <h1>블로그 작성</h1>
          <FormControl fullWidth variant="outlined" margin="dense">
            <TextField
              id="outlined-basic"
              label="제목"
              variant="filled"
              value={title}
              error={title.trim() === "" ? true : false}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="dense">
            <Select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                카테고리 선택
              </MenuItem>
              <MenuItem value="category0">공지</MenuItem>
              <MenuItem value="category1">잡담</MenuItem>
              <MenuItem value="category2">팁</MenuItem>
              <MenuItem value="category3">자랑</MenuItem>
            </Select>
            {category.trim() === "" && (
              <FormHelperText error>카테고리를 선택해주세요</FormHelperText>
            )}
          </FormControl>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
            }}
          >
            <TekkenMarkdownEditor ref={ref} />
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button type="reset">취소</Button>
            <Button
              type="button"
              onClick={() => {
                const md = ref.current?.getMarkdown();
                localStorage.setItem("temp_md", md || "");
                localStorage.setItem("temp_title", title);
                localStorage.setItem("temp_category", category);
              }}
            >
              임시저장
            </Button>
            <Button
              type="submit"
              onClick={async () => {
                const md = ref.current?.getMarkdown();
                if (!md) {
                  alert("내용을 입력해주세요");
                  return;
                }
                if (title.trim() === "" || category.trim() === "") {
                  alert("제목과 카테고리를 입력/설정해주세요");
                  return;
                }

                try {
                  const response = await axios.post(
                    `${BackEndUrl}/blog/post`,
                    {
                      title: title,
                      category: category,
                      body: md,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (response.status === 200) {
                    alert("업로드 성공");
                    localStorage.removeItem("temp_md");
                    localStorage.removeItem("temp_title");
                    localStorage.removeItem("temp_category");
                    window.location.href = "/blogs";
                  } else {
                    alert("업로드 실패");
                  }
                } catch (error) {
                  alert("업로드 실패");
                  localStorage.setItem("temp_md", md || "");
                  localStorage.setItem("temp_title", title);
                  localStorage.setItem("temp_category", category);
                  window.location.href = "/signin";
                }
              }}
            >
              업로드
            </Button>
          </Container>
        </Container>
        {/* <Footer /> */}
      </ThemeProvider>
    </TemplateFrame>
  );
}
