type Survey = {
  question: string;
  options: { [key: string]: string }[];
};

interface GenderOption {
  label: "여자가 좋아요!" | "남자가 좋아요!";
  value: "woman" | "man";
}

interface GenderThemeType {
  question: string;
  options: GenderOption[];
}

export const genderTheme: GenderThemeType = {
  question: "원하는 이상형의 성별을 선택해주세요",
  options: [
    { label: "여자가 좋아요!", value: "woman" },
    { label: "남자가 좋아요!", value: "man" },
  ],
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
      { label: "50대 이상", value: "fifties and older" },
    ],
  },
  {
    question: "원하는 체형을 골라주세요",
    options: [
      { label: "마른 체형", value: "slim body" },
      { label: "통통한 체형", value: "chubby body" },
      { label: "근육질 체형", value: "muscular body" },
    ],
  },
  {
    question: "원하는 얼굴형을 골라주세요",
    options: [
      { label: "둥근형", value: "round face" },
      { label: "계란형", value: "oval face" },
      { label: "하트형", value: "heart-shaped face" },
      { label: "긴 얼굴형", value: "oblong face" },
      { label: "역삼각형", value: "inverted triangle face" },
      { label: "각진형", value: "angular face" },
    ],
  },
  {
    question: "원하는 피부색을 골라주세요",
    options: [
      { label: "엑스트라 화이트 톤", value: "extra white skin tone" },
      { label: "밝고 환한 밀크 톤", value: "bright milk skin tone" },
      { label: "차분한 아이보리 톤", value: "calm ivory skin tone" },
      {
        label: "자연스러운 미디엄 다크 톤",
        value: "natural medium dark skin tone",
      },
      { label: "태닝한 듯 건강한 다크 톤", value: "tanned dark skin tone" },
    ],
  },
  {
    question: "원하는 눈 모양을 골라주세요",
    options: [
      { label: "매력만점 무쌍", value: "monolid eyes" },
      { label: "자연스러운 속쌍", value: "double eyelid eyes" },
      { label: "쌍커풀 짙은 큰 눈", value: "deep double eyelid eyes" },
    ],
  },
  {
    question: "원하는 머리 스타일을 골라주세요",
    options: [
      { label: "시크한 여자 숏컷", value: "short haircut" },
      { label: "귀여운 단발", value: "bob haircut" },
      { label: "자연스러운 중단발", value: "medium length hair" },
      { label: "청순한 긴생머리", value: "long straight hair" },
      { label: "여신 웨이브", value: "long curly hair" },
    ],
  },
  {
    question: "원하는 머리 색을 골라주세요",
    options: [
      { label: "자연스러운 게 최고! 흑발", value: "black hair" },
      { label: "초콜릿 같은 갈색 머리", value: "brown hair" },
      { label: "개성 있는 금발", value: "blonde hair" },
      { label: "강렬한 빨간머리", value: "red hair" },
      { label: "자유로운 영혼, 컬러풀 헤어", value: "colorful hair" },
    ],
  },
  {
    question: "옷 스타일을 골라주세요",
    options: [
      { label: "심플한 캐주얼룩", value: "wearing a simple casual look" },
      { label: "깔끔한 정장", value: "wearing a suit" },
      { label: "힙한 mz룩", value: "wearing a hip hop look" },
      { label: "편한 트레이닝복", value: "wearing a sports wear" },
      { label: "페스티벌룩", value: "wearing a festival look" },
    ],
  },
];

export const surveyContentsMen: Survey[] = [
  {
    question: "원하는 연령대를 골라주세요",
    options: [
      { label: "10대", value: "teenager" },
      { label: "20대", value: "twenties" },
      { label: "30대", value: "thirties" },
      { label: "40대", value: "forties" },
      { label: "50대 이상", value: "fifties and older" },
    ],
  },
  {
    question: "원하는 체형을 골라주세요",
    options: [
      { label: "마른 체형", value: "slim body" },
      { label: "통통한 체형", value: "chubby body" },
      { label: "근육질 체형", value: "muscular body" },
    ],
  },
  {
    question: "원하는 얼굴형을 골라주세요",
    options: [
      { label: "둥근형", value: "round face" },
      { label: "계란형", value: "oval face" },
      { label: "하트형", value: "heart-shaped face" },
      { label: "긴 얼굴형", value: "oblong face" },
      { label: "역삼각형", value: "inverted triangle face" },
      { label: "각진형", value: "angular face" },
    ],
  },
  {
    question: "원하는 피부색을 골라주세요",
    options: [
      { label: "엑스트라 화이트 톤", value: "extra white skin tone" },
      { label: "밝고 환한 밀크 톤", value: "bright milk skin tone" },
      { label: "차분한 아이보리 톤", value: "calm ivory skin tone" },
      {
        label: "자연스러운 미디엄 다크 톤",
        value: "natural medium dark skin tone",
      },
      { label: "태닝한 듯 건강한 다크 톤", value: "tanned dark skin tone" },
    ],
  },
  {
    question: "원하는 눈 모양을 골라주세요",
    options: [
      { label: "매력만점 무쌍", value: "monolid eyes" },
      { label: "자연스러운 속쌍", value: "double eyelid eyes" },
      { label: "쌍커풀 짙은 큰 눈", value: "deep double eyelid eyes" },
    ],
  },
  {
    question: "원하는 머리 스타일을 골라주세요",
    options: [
      { label: "깔끔한 짧은 머리", value: "short hair" },
      { label: "덮은머리", value: "slicked back hair" },
      { label: "한껏 꾸민 포마드", value: "pompadour hairstyle" },
      { label: "뽀글이 펌", value: "poppy perm hair" },
      { label: "느낌 있는 장발", value: "long hair" },
    ],
  },
  {
    question: "원하는 머리 스타일을 골라주세요",
    options: [
      { label: "자연스러운 게 최고! 흑발", value: "black hair" },
      { label: "초콜릿 같은 갈색 머리", value: "brown hair" },
      { label: "개성 있는 금발", value: "blonde hair" },
      { label: "강렬한 빨간머리", value: "red hair" },
      { label: "자유로운 영혼, 컬러풀 헤어", value: "colorful hair" },
    ],
  },
  {
    question: "원하는 옷 스타일을 골라주세요",
    options: [
      { label: "심플한 캐주얼룩", value: "wearing a simple casual look" },
      { label: "깔끔한 정장", value: "wearing a suit" },
      { label: "힙한 mz룩", value: "wearing a hip hop look" },
      { label: "편한 트레이닝복", value: "wearing a sports wear" },
      { label: "페스티벌룩", value: "wearing a festival look" },
    ],
  },
];
