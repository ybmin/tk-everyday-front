import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import StadiumIcon from "@mui/icons-material/Stadium";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import WavingHandIcon from "@mui/icons-material/WavingHand";

import { SitemarkIcon } from "./CustomIcons";

const items = [
  {
    icon: <WavingHandIcon sx={{ color: "text.secondary" }} />,
    title: "철권 클랜 Everyday 사이트에 가입하세요!",
    description:
      "철권 클랜 Everyday 사이트에 가입하시면, 클랜원들과 소통하고, 클랜 활동을 즐기실 수 있습니다.",
  },
  {
    icon: <SportsEsportsIcon sx={{ color: "text.secondary" }} />,
    title: "다양한 정보를 열람하고 공유하세요!",
    description:
      "클랜원이 아니더라도 공개된 일부 정보글을 볼 수 있습니다. 사이트 운영 약관에 어긋나지 않는 선에서의 정보 공유를 환영합니다.",
  },
  {
    icon: <StadiumIcon sx={{ color: "text.secondary" }} />,
    title: "클랜 내부에서 활동하세요!",
    description:
      "다양한 계급으로 구성된 클랜원과 함께, 클랜 활동을 즐기세요. 클랜 활동에 참여하면, 클랜 내부에서의 활동에 대한 보상을 받을 수 있습니다. 클랜 내외부로 진행되는 각종 행사에 참여하세요!",
  },
  {
    icon: <FolderSharedIcon sx={{ color: "text.secondary" }} />,
    title: "클랜원에 대한 정보 분석 제공",
    description:
      "클랜원에 대한 게임 이력을 종합하여, 최근 활동, 변동 등등 다양한 정보를 제공받으세요.",
  },
];

export default function Content() {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <SitemarkIcon />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
