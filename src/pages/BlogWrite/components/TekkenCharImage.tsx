import jin from "assets/tkChar/jin.webp";
import hwoarang from "assets/tkChar/hwoarang.webp";
import kazuya from "assets/tkChar/kazuya.webp";
import king from "assets/tkChar/king.webp";
import law from "assets/tkChar/law.webp";
import paul from "assets/tkChar/paul.webp";
import xiaoyu from "assets/tkChar/xiaoyu.webp";
import yoshimitsu from "assets/tkChar/yoshimitsu.webp";
import dragunov from "assets/tkChar/dragunov.webp";
import asuka from "assets/tkChar/asuka.webp";
import lili from "assets/tkChar/lili.webp";
import steve from "assets/tkChar/steve.webp";
import bryan from "assets/tkChar/bryan.webp";
import feng from "assets/tkChar/feng.webp";
import alisa from "assets/tkChar/alisa.webp";
import devilJin from "assets/tkChar/devil-jin.webp";
import eddy from "assets/tkChar/eddy.webp";
import heihachi from "assets/tkChar/heihachi.webp";
import kuma from "assets/tkChar/kuma.webp";
import lars from "assets/tkChar/lars.webp";
import leo from "assets/tkChar/leo.webp";
import nina from "assets/tkChar/nina.webp";
import panda from "assets/tkChar/panda.webp";
import shaheen from "assets/tkChar/shaheen.webp";
import leroy from "assets/tkChar/leroy.webp";
import zafina from "assets/tkChar/zafina.webp";
import lee from "assets/tkChar/lee.webp";
import victor from "assets/tkChar/victor.webp";
import jack8 from "assets/tkChar/jack.webp";
import lidia from "assets/tkChar/lidia.webp";
import raven from "assets/tkChar/raven.webp";
import jun from "assets/tkChar/jun.webp";
import reina from "assets/tkChar/reina.webp";
import claudio from "assets/tkChar/claudio.webp";
import azucena from "assets/tkChar/azucena.webp";

type TekkenCharType = {
  [key: string]: {
    name: string;
    src: any;
  };
};

const charJson = {
  "0": {
    name: "폴",
    src: paul,
  },
  "1": {
    name: "로우",
    src: law,
  },
  "2": {
    name: "킹",
    src: king,
  },
  "3": {
    name: "요시미츠",
    src: yoshimitsu,
  },
  "4": {
    name: "화랑",
    src: hwoarang,
  },
  "5": {
    name: "샤오유",
    src: xiaoyu,
  },
  "6": {
    name: "노멀 진",
    src: jin,
  },
  "7": {
    name: "브라이언",
    src: bryan,
  },
  "8": {
    name: "카즈야",
    src: kazuya,
  },
  "9": {
    name: "스티브",
    src: steve,
  },
  "10": {
    name: "잭8",
    src: jack8,
  },
  "11": {
    name: "아스카",
    src: asuka,
  },
  "12": {
    name: "데빌진",
    src: devilJin,
  },
  "13": {
    name: "펭",
    src: feng,
  },
  "14": {
    name: "리리",
    src: lili,
  },
  "15": {
    name: "드라그노프",
    src: dragunov,
  },
  "16": {
    name: "레오",
    src: leo,
  },
  "17": {
    name: "라스",
    src: lars,
  },
  "18": {
    name: "알리사",
    src: alisa,
  },
  "19": {
    name: "클라우디오",
    src: claudio,
  },
  "20": {
    name: "샤힌",
    src: shaheen,
  },
  "21": {
    name: "니나",
    src: nina,
  },
  "22": {
    name: "리",
    src: lee,
  },
  "23": {
    name: "쿠마",
    src: kuma,
  },
  "24": {
    name: "판다",
    src: panda,
  },
  "28": {
    name: "자피나",
    src: zafina,
  },
  "29": {
    name: "리로이",
    src: leroy,
  },
  "32": {
    name: "준",
    src: jun,
  },
  "33": {
    name: "레이나",
    src: reina,
  },
  "34": {
    name: "아주세나",
    src: azucena,
  },
  "35": {
    name: "빅터",
    src: victor,
  },
  "36": {
    name: "레이븐",
    src: raven,
  },
  "38": {
    name: "에디",
    src: eddy,
  },
  "39": {
    name: "리디아",
    src: lidia,
  },
  "40": {
    name: "헤이하치",
    src: heihachi,
  },
};

const charData: TekkenCharType = charJson;

export const TekkenCharImage = ({ char }: { char: string }) => {
  return (
    <img
      src={charData[char]?.src}
      alt={charData[char]?.name}
      style={{
        maxWidth: 80,
        maxHeight: 80,
        borderRadius: 80,
        minHeight: 20,
        minWidth: 20,
        width: "100%",
        height: "auto",
      }}
    />
  );
};
