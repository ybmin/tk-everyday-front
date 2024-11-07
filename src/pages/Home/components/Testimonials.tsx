import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import TekkenRankImage from "pages/BlogWrite/components/TekkenRankImage";
import { useState, useEffect } from "react";
import axios from "axios";
import { BackEndUrl } from "utils/loadEnv";
import { TekkenCharImage } from "pages/BlogWrite/components/TekkenCharImage";

const userTestimonials = [
  {
    name: "WarQueen",
    id: "3RHTmh8ThQ6j",
  },
  {
    name: "ybminm",
    id: "5m3qhrAgaHJr",
  },
  {
    name: "불바퀴",
    id: "3GfHyrtmJR6Q",
  },
  {
    name: "상회",
    id: "65Ed4E2aGiJG",
  },
  {
    name: "짜장면",
    id: "4hqeY4YbhfrB",
  },
  {
    name: "LARK",
    id: "4g6Jbq8HRajh",
  },
  {
    name: "꼬마유령",
    id: "3eDQhd5bBTyQ",
  },
  { name: "김노멀", id: "3hEbtB5qFm4J" },
  { name: "레이븐데뷔생", id: "3bGRbbTba8Ba" },
  { name: "KATASTRY", id: "2Qhqfdb9yMyQ" },
  { name: "춘식이", id: "5gMtFb4YDnTn" },
  { name: "여우", id: "3MNE44FaeGdn" },
  { name: "Ninesquare", id: "5Dr2JfNb7QMG" },
  { name: "GangKing", id: "5eb5in879ehh" },
  { name: "규", id: "4i7jYFEyhY24" },
  { name: "Voyy", id: "3yYmLBALt4fh" },
  { name: "주먹밥", id: "5m8YretfTgdy" },
  { name: "소림", id: "2JgJA5fL5qQy" },
];

export default function Testimonials() {
  const [userData, setUserData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    userTestimonials.forEach(async (testimonial) => {
      try {
        const response = await axios.get(
          `${BackEndUrl}/tekken_user/${testimonial.id}`
        );
        setUserData((prev) => ({ ...prev, [testimonial.id]: response.data }));
      } catch (error) {
        console.error(`Error fetching data for ID ${testimonial.id}:`, error);
      }
    });
  }, []);

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          EveryDay 클랜원
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          항상 철권과 다양한 주제로 화목한 분위기를 만들어주시는 클랜
          구성원분들입니다.
        </Typography>
      </Box>
      <Grid container spacing={2} alignSelf="center">
        {userTestimonials.map((testimonial) => {
          const data = userData[testimonial.id];
          return data ? (
            <Box
              key={testimonial.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginBottom: 2,
                width: 350,
                marginLeft: { xs: 0, sm: 2 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor:
                    testimonial.name === "WarQueen" ? "Highlight" : "Menu",
                  borderRadius: 2,
                  padding: 2,
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.open(
                    `https://wank.wavu.wiki/player/${testimonial.id}`
                  );
                }}
              >
                <TekkenCharImage
                  char={data.characters
                    .sort((a: any, b: any) => {
                      if (b.char_rank === a.char_rank) {
                        return b.char_played_games - a.char_played_games;
                      }
                      return b.char_rank - a.char_rank;
                    })[0]
                    ?.char_id.toString()}
                />
                <Box sx={{ marginLeft: 1 }}>
                  <Typography variant="h6">{data.nickname}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {data.polaris_id}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {/* <TekkenRankImage rank={data.highest_rank} /> */}
                    <TekkenRankImage
                      rank={
                        data.characters.sort((a: any, b: any) => {
                          if (b.char_rank === a.char_rank) {
                            return b.char_played_games - a.char_played_games;
                          }
                          return b.char_rank - a.char_rank;
                        })[0]?.char_rank
                      }
                    />
                    <Typography variant="body2">
                      Tekken Power: {data.tekken_power}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : null;
        })}
      </Grid>
    </Container>
  );
}
