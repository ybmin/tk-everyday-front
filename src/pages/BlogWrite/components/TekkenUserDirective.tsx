import { Box, Chip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteRounded } from "@mui/icons-material";
import TekkenRankImage from "./TekkenRankImage";
import { TekkenCharImage } from "./TekkenCharImage";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive/lib";
import { BackEndUrl } from "utils/loadEnv";

interface TekkenUserDirectiveMode extends LeafDirective {
  name: "user_tekken";
  attributes: { id: string };
}

export const TekkenUserDirectiveDescriptor: DirectiveDescriptor<TekkenUserDirectiveMode> =
  {
    name: "user_tekken",
    type: "leafDirective",
    testNode(node) {
      return node.name === "user_tekken";
    },
    attributes: ["id"],
    hasChildren: false,
    Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
      const [response, setResponse] = useState<any>(null);
      const [isHovered, setIsHovered] = useState(false);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get(
              `${BackEndUrl}/tekken_user/${mdastNode.attributes.id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            setResponse(result.data);
          } catch (error) {
            console.error("Error fetching match data:", error);
          }
        };

        fetchData();
      }, [mdastNode.attributes.id]);

      return response ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            marginBottom: 10,
          }}
        >
          <Chip
            icon={<DeleteRounded />}
            label="삭제"
            onClick={() => {
              parentEditor.update(() => {
                lexicalNode.selectNext();
                lexicalNode.remove();
              });
            }}
          />
          <Box
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              backgroundColor: isHovered ? "Highlight" : "ActiveBorder",
              borderRadius: 10,
              maxWidth: "100%",
              padding: 20,
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(
                // `http://localhost:3000/tekken_user/${mdastNode.attributes.id}`
                `https://wank.wavu.wiki/player/${mdastNode.attributes.id}`
              );
            }}
            onMouseEnter={() => {
              if (!isHovered) {
                setIsHovered(true);
              }
            }}
            onMouseLeave={() => {
              if (isHovered) {
                setIsHovered(false);
              }
            }}
          >
            <TekkenCharImage
              char={
                response.characters.sort((a: any, b: any) => {
                  if (b.char_rank === a.char_rank) {
                    return b.char_played_games - a.char_played_games;
                  }
                  return b.char_rank - a.char_rank;
                })[0]?.char_id
              }
            />
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: 10,
              }}
            >
              <h1 style={{ margin: 0 }}>{response.nickname}</h1>
              <h3 style={{ margin: 0, color: "#B8B8B8", marginBottom: 10 }}>
                {response.polaris_id}
              </h3>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TekkenRankImage rank={response.highest_rank} />
                <h5 style={{ margin: 0, textAlign: "center" }}>
                  Tekken Power{"\n" + response.tekken_power}
                </h5>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Chip
          icon={<DeleteRounded></DeleteRounded>}
          label={"No User Found: " + mdastNode.attributes.id}
          onClick={() => {
            parentEditor.update(() => {
              lexicalNode.selectNext();
              lexicalNode.remove();
            });
          }}
        />
      );
    },
  };
