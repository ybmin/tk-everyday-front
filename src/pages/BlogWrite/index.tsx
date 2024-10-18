import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import AppAppBar from "./components/AppAppBar";
import Footer from "./components/Footer";
import TemplateFrame from "./TemplateFrame";

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  StrikeThroughSupSubToggles,
  InsertImage,
  markdownShortcutPlugin,
  DialogButton,
  usePublisher,
  insertDirective$,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import getBlogTheme from "./theme/getBlogTheme";
import { Youtube } from "./components/Editor";

export default function BlogWritePage() {
  const [mode] = React.useState<PaletteMode>("dark");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  // This code only runs on the client side, to determine the system color preference
  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  const ref = React.useRef<MDXEditorMethods>(null);

  const YouTubeButton = () => {
    // grab the insertDirective action (a.k.a. publisher) from the
    // state management system of the directivesPlugin
    const insertDirective = usePublisher(insertDirective$);

    return (
      <DialogButton
        tooltipTitle="Insert Youtube video"
        submitButtonTitle="Insert video"
        dialogInputPlaceholder="Paste the youtube video URL"
        buttonContent="YT"
        onSubmit={(url) => {
          const videoId = new URL(url).searchParams.get("v");
          if (videoId) {
            insertDirective({
              name: "youtube",
              type: "leafDirective",
              attributes: { id: videoId },
              // children: [],
            });
          } else {
            alert("Invalid YouTube URL");
          }
        }}
      />
    );
  };

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
          {/* <MainContent />
          <Latest /> */}
          <h1>Blog Write Page</h1>{" "}
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
            }}
          >
            <Youtube />
          </Container>
        </Container>
        <Footer />
      </ThemeProvider>
    </TemplateFrame>
  );
}
