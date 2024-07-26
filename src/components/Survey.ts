type Survey = {
  question: string;
  options: { [key: string]: string }[];
};


interface GenderOption {
  label: "여자" | "남자"; 
  value: "woman" | "man"; 
}

interface GenderThemeType {
  question: string;
  options: GenderOption[];
}

export const genderTheme: GenderThemeType = {
  question: "원하는 이상형의 성별을 선택해주세요",
  options: [
    { label: "여자", value: "woman" },
    { label: "남자", value: "man" }
  ]
};


// 성별이 여자인 경우 설문내용
export const surveyContentsWomen: Survey[] = [
  {
    question: "원하는 연령대를 골라주세요",
    options: [
      { label: "10대", value: "teenager" },
      { label: "20대", value: "twenties" },
      { label: "30대", value: "thirties" },
      { label: "40대", value: "forties" },
      { label: "50대 이상", value: "fifties and older" }
    ]
  },
  {
    question: "원하는 체형을 골라주세요",
    options: [
      { label: "마른 체형", value: "slim body" },
      { label: "통통한 체형", value: "chubby body" },
      { label: "근육질 체형", value: "muscular body" }
    ]
  },
  {
    question: "원하는 머리 길이를 골라주세요",
    options: [
      { label: "여자 숏컷", value: "short haircut" },
      { label: "단발", value: "bob haircut" },
      { label: "중단발", value: "medium length hair" },
      { label: "긴머리", value: "long hair" }
    ]
  },
  {
    question: "원하는 머리 스타일을 골라주세요",
    options: [
      { label: "생머리", value: "straight hair" },
      { label: "자연스러운 웨이브", value: "natural wave" },
      { label: "곱슬 머리", value: "curly hair" }
    ]
  },
  {
    question: "원하는 머리 색을 골라주세요",
    options: [
      { label: "흑발", value: "black hair" },
      { label: "금발", value: "blonde hair" },
      { label: "은발", value: "silver hair" },
      { label: "갈색", value: "brown hair" },
      { label: "빨간색", value: "red hair" }
    ]
  },
  {
    question: "원하는 얼굴형을 골라주세요",
    options: [
      { label: "동그란 얼굴형", value: "round face" },
      { label: "계란 얼굴형", value: "oval face" },
      { label: "갸름한 얼굴형", value: "heart-shaped face" },
      { label: "타원형 얼굴형", value: "oblong face" },
      { label: "각진 얼굴형", value: "square face" }
    ]
  },
  {
    question: "원하는 눈 모양을 골라주세요",
    options: [
      { label: "무쌍", value: "monolid eyes" },
      { label: "속쌍", value: "double eyelid eyes" },
      { label: "쌍커풀 짙은 눈", value: "deep double eyelid eyes" }
    ]
  },
  {
    question: "원하는 피부색을 골라주세요",
    options: [
      { label: "엑스트라 화이트 톤", value: "extra white skin tone" },
      { label: "밝고 환한 밀크 톤", value: "bright milk skin tone" },
      { label: "차분한 아이보리 톤", value: "calm ivory skin tone" },
      { label: "자연스러운 미디엄 다크 톤", value: "natural medium dark skin tone" },
      { label: "태닝한 듯 건강한 다크 톤", value: "tanned dark skin tone" }
    ]
  },
  {
    question: "옷 스타일을 골라주세요",
    options: [
      { label: "심플한 캐주얼룩", value: "simple casual outfit" },
      { label: "오피스룩", value: "office outfit" },
      { label: "힙합룩", value: "hip hop outfit" },
      { label: "유니폼", value: "uniform" },
      { label: "페스티벌룩", value: "festival outfit" }
    ]
  },
  {
    question: "원하는 스타일을 골라주세요",
    options: [
      { label: "귀여운 스타일", value: "cute style" },
      { label: "청순한 스타일", value: "innocent style" },
      { label: "너드 스타일", value: "nerdy style" },
      { label: "말괄량이 스타일", value: "tomboy style" }
    ]
  }
];

export const surveyContentsMen: Survey[] = [
  {
    question: "원하는 연령대를 골라주세요",
    options: [
      { label: "10대", value: "teenager" },
      { label: "20대", value: "twenties" },
      { label: "30대", value: "thirties" },
      { label: "40대", value: "forties" },
      { label: "50대 이상", value: "fifties and older" }
    ],
  },
  {
    question: "원하는 체형을 골라주세요",
    options: [
      { label: "마른 체형", value: "slim body" },
      { label: "통통한 체형", value: "chubby body" },
      { label: "근육질 체형", value: "muscular body" }
    ],
  },
  {
    question: "원하는 머리 길이를 골라주세요",
    options: [
      { label: "아주 짧은 머리", value: "very short hair" },
      { label: "짧은 머리", value: "short hair" },
      { label: "보통 길이의 머리", value: "medium length hair" },
      { label: "남자 긴머리", value: "long hair" }
    ],
  },
  {
    question: "원하는 머리 색을 골라주세요",
    options: [
      { label: "흑발", value: "black hair" },
      { label: "금발", value: "blonde hair" },
      { label: "은발", value: "silver hair" },
      { label: "갈색", value: "brown hair" },
      { label: "빨간색", value: "red hair" }
    ],
  },
  {
    question: "원하는 머리 스타일을 골라주세요",
    options: [
      { label: "생머리", value: "straight hair" },
      { label: "곱슬머리", value: "curly hair" },
      { label: "덮은머리", value: "slicked back hair" },
      { label: "포마드 머리", value: "pompadour hairstyle" }
    ],
  },
  {
    question: "원하는 얼굴형을 골라주세요",
    options: [
      { label: "동그란 얼굴형", value: "round face" },
      { label: "계란 얼굴형", value: "oval face" },
      { label: "갸름한 얼굴형", value: "heart-shaped face" },
      { label: "타원형 얼굴형", value: "oblong face" },
      { label: "각진 얼굴형", value: "square face" }
    ],
  },
  {
    question: "원하는 눈 모양을 골라주세요",
    options: [
      { label: "무쌍", value: "monolid eyes" },
      { label: "속쌍", value: "double eyelid eyes" },
      { label: "쌍커풀 짙은 눈", value: "deep double eyelid eyes" }
    ],
  },
  {
    question: "원하는 피부색을 골라주세요",
    options: [
      { label: "엑스트라 화이트 톤", value: "extra white skin tone" },
      { label: "밝고 환한 밀크 톤", value: "bright milk skin tone" },
      { label: "차분한 아이보리 톤", value: "calm ivory skin tone" },
      { label: "자연스러운 미디엄 다크 톤", value: "natural medium dark skin tone" },
      { label: "태닝한 듯 건강한 다크 톤", value: "tanned dark skin tone" }
    ],
  },
  {
    question: "옷 스타일을 골라주세요",
    options: [
      { label: "심플한 캐주얼룩", value: "simple casual outfit" },
      { label: "오피스룩", value: "office outfit" },
      { label: "힙합룩", value: "hip hop outfit" },
      { label: "유니폼", value: "uniform" },
      { label: "페스티벌룩", value: "festival outfit" }
    ],
  },
  {
    question: "원하는 스타일을 골라주세요",
    options: [
      { label: "듬직한 스타일", value: "solid outfit" },
      { label: "헬창 스타일", value: "muscle outfit" },
      { label: "너드 스타일", value: "nerdy outfit" },
      { label: "귀여운 스타일", value: "cute outfit" }
    ],
  }
];
