import { Box, Button, Chip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteRounded } from "@mui/icons-material";
import TekkenRankImage from "./TekkenRankImage";
import { TekkenCharImage } from "./TekkenCharImage";
import { DirectiveDescriptor } from "@mdxeditor/editor";
import { LeafDirective } from "mdast-util-directive/lib";
import { BackEndUrl } from "utils/loadEnv";

interface RankMatchDirectiveNode extends LeafDirective {
  name: "match";
  attributes: { id: string };
}
export const RankMatchDirectiveDescriptor: DirectiveDescriptor<RankMatchDirectiveNode> =
  {
    name: "match",
    type: "leafDirective",
    testNode(node) {
      return node.name === "match";
    },
    attributes: ["id"],
    hasChildren: false,
    Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
      const [response, setResponse] = useState<any>(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get(
              `${BackEndUrl}/battles/${mdastNode.attributes.id}`,
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
        <div
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
              display: "flex",
              flexDirection: "row",
              padding: 20,
              alignContent: "center",
              justifyItems: "stretch",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: 10,
              maxWidth: "100%",
            }}
          >
            <Button
              variant="text"
              style={{
                height: 100,
                maxWidth: 220,
                flex: 3,
              }}
              onClick={() => {
                window.open(
                  `https://wank.wavu.wiki/player/${response.p1_polaris_id}`
                );
              }}
            >
              <TekkenCharImage char={response.p1_chara_id} />
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
                <h4
                  style={{
                    padding: 0,
                    margin: 0,
                    height: 40,
                    width: 100,
                    maxLines: 1,
                  }}
                >
                  {response.p1_name}
                </h4>
                <TekkenRankImage rank={parseInt(response.p1_rank)} />
              </div>
            </Button>
            <Button
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 2,
                height: 100,
                textOverflow: "ellipsis",
                alignContent: "center",
                justifyItems: "flex-start",
                fontSize: 10,
                textAlign: "center",
                color: "black",
              }}
            >
              {/* This is a rank match with id: {mdastNode.attributes.id} */}
              <h4 style={{ margin: 0 }}>
                {new Date(response.battle_at * 1000).toLocaleString("ko-KR")}
              </h4>
              <h3
                style={{
                  fontSize: 30,
                  color: "gray",
                  margin: 0,
                }}
              >
                <span
                  style={{
                    color: response.winner === 1 ? "#0B874A" : "#AD1B1B",
                  }}
                >
                  {response.p1_rounds}
                </span>
                <span>:</span>
                <span
                  style={{
                    color: response.winner === 2 ? "#0B874A" : "#AD1B1B",
                  }}
                >
                  {response.p2_rounds}
                </span>
              </h3>
              <h4 style={{ margin: 0 }}>
                v.{response.game_version.toString().replaceAll("0", ".")}
              </h4>
            </Button>
            <Button
              style={{
                height: 100,
                maxWidth: 220,
                flex: 3,
              }}
              onClick={() => {
                window.open(
                  `https://wank.wavu.wiki/player/${response.p2_polaris_id}`
                );
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
                <h4
                  style={{
                    padding: 0,
                    margin: 0,
                    height: 40,
                    width: 100,
                    maxLines: 1,
                  }}
                >
                  {response.p2_name}
                </h4>
                <TekkenRankImage rank={parseInt(response.p2_rank)} />
              </div>
              <TekkenCharImage char={response.p2_chara_id} />
            </Button>
          </Box>
        </div>
      ) : (
        <Chip
          icon={<DeleteRounded></DeleteRounded>}
          label={"No Battle Found: " + mdastNode.attributes.id}
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
