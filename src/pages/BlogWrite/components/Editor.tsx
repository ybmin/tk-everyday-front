import {
  BoldItalicUnderlineToggles,
  DialogButton,
  directivesPlugin,
  headingsPlugin,
  insertDirective$,
  InsertImage,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  maxLengthPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  StrikeThroughSupSubToggles,
  toolbarPlugin,
  UndoRedo,
  usePublisher,
} from "@mdxeditor/editor";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { LeafDirective } from "mdast-util-directive";
import { RankMatchDirectiveDescriptor } from "./RankMatchDirective";
import { TekkenUserDirectiveDescriptor } from "./TekkenUserDirective";
import React from "react";
const currentMarkdown = `
This should be an rank match link:

::match{#00164881CD6145E8A36E389705D9F235}
::match{#009C75D4DB724F5881EF4E2147AA73EA}
::match{#00575A9F35FE4A17AE4B8AB7A912E22F}
::user_tekken{#3ifnTgaAnN9B}
`;

// const GenericDirectiveDescriptor: DirectiveDescriptor = {
//   name: "directive",
//   testNode() {
//     return true;
//   },
//   attributes: ["id"],
//   hasChildren: true,
//   Editor: GenericDirectiveEditor,
// };

const RankMatchButton = () => {
  const insertDirective = usePublisher(insertDirective$);

  return (
    <DialogButton
      tooltipTitle="Insert Rank Match Link"
      submitButtonTitle="Insert Link"
      dialogInputPlaceholder="Paste the rank match URL"
      buttonContent={<MilitaryTechIcon />}
      onSubmit={(url) => {
        // const videoId = new URL(url).searchParams.get("v");
        const videoId = url.split("/").pop();
        if (videoId) {
          insertDirective({
            name: "match",
            type: "leafDirective",

            attributes: { id: videoId },
            children: [],
          } as LeafDirective);
        } else {
          alert("Invalid Rank Match URL");
        }
      }}
    />
  );
};

const TekkenUserButton = () => {
  const insertDirective = usePublisher(insertDirective$);

  return (
    <DialogButton
      tooltipTitle="Insert Tekken User Link"
      submitButtonTitle="Insert Link"
      dialogInputPlaceholder="Paste the tekken user URL"
      buttonContent={<ContactPageIcon />}
      onSubmit={(url) => {
        // const videoId = new URL(url).searchParams.get("v");
        const videoId = url.split("/").pop();
        if (videoId) {
          insertDirective({
            name: "user_tekken",
            type: "leafDirective",

            attributes: { id: videoId },
            children: [],
          } as LeafDirective);
        } else {
          alert("Invalid tekken user URL");
        }
      }}
    />
  );
};

export const TekkenMarkdownEditor = React.forwardRef<MDXEditorMethods>(
  (props, ref) => {
    return (
      <MDXEditor
        ref={ref}
        markdown={currentMarkdown}
        plugins={[
          directivesPlugin({
            directiveDescriptors: [
              RankMatchDirectiveDescriptor,
              TekkenUserDirectiveDescriptor,
            ],
          }),
          toolbarPlugin({
            toolbarContents: () => {
              return (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <StrikeThroughSupSubToggles />
                  <ListsToggle />
                  <InsertImage />
                  <RankMatchButton />
                  <TekkenUserButton />
                </>
              );
            },
          }),
          headingsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          listsPlugin(),
          maxLengthPlugin(10000),
        ]}
      />
    );
  }
);
