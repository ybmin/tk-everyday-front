// import rankJson from "assets/tkRank/rank.json";
import r0 from "assets/tkRank/r0.webp";
import r1 from "assets/tkRank/r1.webp";
import r2 from "assets/tkRank/r2.webp";
import r3 from "assets/tkRank/r3.webp";
import r4 from "assets/tkRank/r4.webp";
import r5 from "assets/tkRank/r5.webp";
import r6 from "assets/tkRank/r6.webp";
import r7 from "assets/tkRank/r7.webp";
import r8 from "assets/tkRank/r8.webp";
import r9 from "assets/tkRank/r9.webp";
import r10 from "assets/tkRank/r10.webp";
import r11 from "assets/tkRank/r11.webp";
import r12 from "assets/tkRank/r12.webp";
import r13 from "assets/tkRank/r13.webp";
import r14 from "assets/tkRank/r14.webp";
import r15 from "assets/tkRank/r15.webp";
import r16 from "assets/tkRank/r16.webp";
import r17 from "assets/tkRank/r17.webp";
import r18 from "assets/tkRank/r18.webp";
import r19 from "assets/tkRank/r19.webp";
import r20 from "assets/tkRank/r20.webp";
import r21 from "assets/tkRank/r21.webp";
import r22 from "assets/tkRank/r22.webp";
import r23 from "assets/tkRank/r23.webp";
import r24 from "assets/tkRank/r24.webp";
import r25 from "assets/tkRank/r25.webp";
import r26 from "assets/tkRank/r26.webp";
import r27 from "assets/tkRank/r27.webp";
import r28 from "assets/tkRank/r28.webp";
import r30 from "assets/tkRank/r30.webp";
const rankJson = {
  "0": {
    name: "비기너",
    src: r0,
  },
  "1": {
    name: "1단",
    src: r1,
  },
  "2": {
    name: "2단",
    src: r2,
  },
  "3": {
    name: "파이터",
    src: r3,
  },
  "4": {
    name: "스트레티지스트",
    src: r4,
  },
  "5": {
    name: "컴베턴트",
    src: r5,
  },
  "6": {
    name: "브롤러",
    src: r6,
  },
  "7": {
    name: "레인저",
    src: r7,
  },
  "8": {
    name: "캐벌리",
    src: r8,
  },
  "9": {
    name: "워리어",
    src: r9,
  },
  "10": {
    name: "어사일런트",
    src: r10,
  },
  "11": {
    name: "도미네이터",
    src: r11,
  },
  "12": {
    name: "뱅퀴셔",
    src: r12,
  },
  "13": {
    name: "디스트로이어",
    src: r13,
  },
  "14": {
    name: "일리미네이터",
    src: r14,
  },
  "15": {
    name: "가류",
    src: r15,
  },
  "16": {
    name: "신류",
    src: r16,
  },
  "17": {
    name: "텐류",
    src: r17,
  },
  "18": {
    name: "마이티룰러",
    src: r18,
  },
  "19": {
    name: "플레임룰러",
    src: r19,
  },
  "20": {
    name: "배틀룰러",
    src: r20,
  },
  "21": {
    name: "푸진",
    src: r21,
  },
  "22": {
    name: "라이진",
    src: r22,
  },
  "23": {
    name: "키신",
    src: r23,
  },
  "24": {
    name: "부신",
    src: r24,
  },
  "25": {
    name: "테켄킹",
    src: r25,
  },
  "26": {
    name: "테켄엠퍼러",
    src: r26,
  },
  "27": {
    name: "테켄갓",
    src: r27,
  },
  "28": {
    name: "테켄슈프림",
    src: r28,
  },
  "29": {
    name: "갓오브디스트럭션",
    src: r30,
  },
};

type RankJsonType = {
  [key: string]: {
    name: string;
    src: any;
  };
};

const rankData: RankJsonType = rankJson;

export default function TekkenRankImage({ rank }: { rank: number }) {
  return (
    <div>
      <img
        src={rankData[rank.toString()]?.src}
        alt={rankData[rank.toString()]?.name || "rankImage"}
        style={{
          maxWidth: 100,
          maxHeight: 50,
          width: "75%",
          height: "auto",
        }}
      />
    </div>
  );
}
