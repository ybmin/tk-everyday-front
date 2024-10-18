import {
  BoldItalicUnderlineToggles,
  DialogButton,
  DirectiveDescriptor,
  directivesPlugin,
  GenericDirectiveEditor,
  headingsPlugin,
  insertDirective$,
  InsertImage,
  markdownShortcutPlugin,
  MDXEditor,
  StrikeThroughSupSubToggles,
  toolbarPlugin,
  UndoRedo,
  usePublisher,
} from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive";

const youtubeMarkdown = `
This should be an rank match link:

::match{#A5lXAKrttBU}
`;

interface YoutubeDirectiveNode extends LeafDirective {
  name: "match";
  attributes: { id: string };
}

export const YoutubeDirectiveDescriptor: DirectiveDescriptor<YoutubeDirectiveNode> =
  {
    name: "match",
    type: "leafDirective",
    testNode(node) {
      return node.name === "match";
    },
    attributes: ["id"],
    hasChildren: false,
    Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <button
            onClick={() => {
              parentEditor.update(() => {
                lexicalNode.selectNext();
                lexicalNode.remove();
              });
            }}
          >
            삭제
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 20,
              backgroundColor: "#f0f0f0",
              borderRadius: 10,
              gap: 10,
              alignContent: "center",
              justifyItems: "center",
              alignItems: "center",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <button
              type="button"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                backgroundColor: "#f0f0f0",
                padding: 10,
                border: "none",
                borderRadius: 10,
                alignItems: "center",
                justifyItems: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  borderRadius: 80,
                  width: 80,
                  height: 80,
                  //   backgroundColor: "Highlight",
                  backgroundImage:
                    "url(https://tk8.tekken-official.jp/images/character/bryan/btn.png)",
                  backgroundSize: "cover",
                  textAlign: "center",
                  alignContent: "center",
                  fontSize: 10,
                  color: "white",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  width: 100,
                  textOverflow: "ellipsis",
                  justifyItems: "flex-start",
                  alignContent: "center",
                  alignItems: "flex-start",
                  color: "black",
                }}
              >
                <span>P1 Nickname</span>

                <div
                  style={{
                    backgroundImage:
                      "url(https://tekkendocs.com/assets/tekken-emperor-BSjYf59r.png)",
                    backgroundSize: "cover",
                    width: 100,
                    height: 50,
                  }}
                />
                {/* <span>P1 Rank</span> */}
              </div>
            </button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 100,
                textOverflow: "ellipsis",
                alignContent: "center",
                justifyItems: "flex-start",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {/* This is a rank match with id: {mdastNode.attributes.id} */}
              <span>2024-09-12 12:00</span>
              <span
                style={{
                  fontSize: 30,
                  color: "gray",
                }}
              >
                <span style={{ color: "#AD1B1B" }}>1</span>
                <span>:</span>
                <span style={{ color: "#0B874A" }}>3</span>
              </span>
              <span>v.1.0.8</span>
            </div>
            <button
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                backgroundColor: "#f0f0f0",
                padding: 10,
                border: "none",
                borderRadius: 10,
                alignItems: "center",
                justifyItems: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 100,
                  gap: 10,
                  alignContent: "center",
                  alignItems: "flex-end",
                  textOverflow: "ellipsis",
                  color: "black",
                }}
              >
                <span>P2 Nickname</span>
                <div
                  style={{
                    backgroundImage:
                      "url(https://tekkendocs.com/assets/tekken-god-supreme-Cr4z73_F.png)",
                    backgroundSize: "cover",
                    width: 100,
                    height: 50,
                  }}
                />
                {/* <span>P2 Rank</span> */}
              </div>
              <div
                style={{
                  borderRadius: 80,
                  width: 80,
                  height: 80,
                  backgroundImage:
                    "url(https://tk8.tekken-official.jp/images/character/heihachi/btn.png)",
                  backgroundSize: "cover",
                  textAlign: "center",
                  alignContent: "center",
                  fontSize: 10,
                  color: "white",
                }}
              ></div>
            </button>
          </div>
        </div>
      );
    },
  };

const GenericDirectiveDescriptor: DirectiveDescriptor = {
  name: "directive",
  testNode() {
    return true;
  },
  attributes: ["id"],
  hasChildren: true,
  Editor: GenericDirectiveEditor,
};

const YouTubeButton = () => {
  const insertDirective = usePublisher(insertDirective$);

  return (
    <DialogButton
      tooltipTitle="Insert Rank Match Link"
      submitButtonTitle="Insert Link"
      dialogInputPlaceholder="Paste the rank match URL"
      buttonContent="Rank"
      onSubmit={(url) => {
        const videoId = new URL(url).searchParams.get("v");
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

export const Youtube: React.FC = () => {
  return (
    <MDXEditor
      markdown={youtubeMarkdown}
      plugins={[
        directivesPlugin({
          directiveDescriptors: [YoutubeDirectiveDescriptor],
        }),
        toolbarPlugin({
          toolbarContents: () => {
            return (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <StrikeThroughSupSubToggles />
                <InsertImage />
                <YouTubeButton />
              </>
            );
          },
        }),
        headingsPlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
};
