export type SurveyTypes = {
  question: string;
  options: {[key: string]: string}[];
};

// 성별이 여자인 경우 설문내용
export const surveyContentsWomen: SurveyTypes[] = [
  {
    question: '원하는 연령대를 골라주세요',
    options: [
      {label: '20대', value: '20s'},
      {label: '30대', value: '30s'},
      {label: '40대', value: '40s'},
      {label: '50대 이상', value: '50s and over'},
    ],
  },
  {
    question: '원하는 체형을 골라주세요',
    options: [
      {label: '마른 체형', value: 'slim'},
      {label: '통통한 체형', value: 'chubby'},
      {label: '근육질 체형', value: 'muscular'},
      {label: '상관 없음', value: 'average body'},
    ],
  },
  {
    question: '원하는 얼굴형을 골라주세요',
    options: [
      {label: '둥근형', value: 'round face'},
      {label: '계란형', value: 'oval face'},
      {label: '각진형', value: 'angular face'},
      {label: '상관 없음', value: 'natural face'},
    ],
  },
  {
    question: '원하는 피부색을 골라주세요',
    options: [
      {label: '밝고 환한 밀크 톤', value: 'bright milk skin'},
      {
        label: '자연스러운 미디엄 다크 톤',
        value: 'natural medium dark skin',
      },
      {label: '태닝한 듯 건강한 다크 톤', value: 'tanned dark skin'},
      {label: '상관 없음', value: 'natural skin tone'},
    ],
  },
  {
    question: '원하는 눈 모양을 골라주세요',
    options: [
      {label: '매력만점 무쌍', value: 'monolid eyes'},
      {label: '자연스러운 속쌍', value: 'double eyelid eyes'},
      {label: '쌍커풀 짙은 큰 눈', value: 'deep double eyelid eyes'},
      {label: '상관 없음', value: 'simple eyes'},
    ],
  },
  {
    question: '원하는 머리 스타일을 골라주세요',
    options: [
      {label: '시크한 여자 숏컷', value: 'short'},
      {label: '귀여운 단발', value: 'bob'},
      {label: '자연스러운 중단발', value: 'medium length'},
      {label: '청순한 긴생머리', value: 'long straight'},
      {label: '상관 없음', value: 'natural straight hair'},
    ],
  },
  {
    question: '원하는 머리 색을 골라주세요',
    options: [
      {label: '자연스러운 게 최고! 흑발', value: 'black hair'},
      {label: '초콜릿 같은 갈색 머리', value: 'brown hair'},
      {label: '개성 있는 금발', value: 'blonde hair'},
      {label: '강렬한 빨간머리', value: 'red hair'},
      {label: '자유로운 영혼, 컬러풀 헤어', value: 'colorful hair'},
      {label: '상관 없음', value: 'natural color hair'},
    ],
  },
  {
    question: '옷 스타일을 골라주세요',
    options: [
      {label: '심플한 캐주얼룩', value: 'simple casual style'},
      {label: '깔끔한 정장', value: 'suit'},
      {label: '힙한 mz룩', value: 'hip hop style'},
      {label: '편한 트레이닝복', value: 'sports style'},
      {label: '상관 없음', value: 'simple casual style'},
    ],
  },
];

export const surveyContentsMen: SurveyTypes[] = [
  {
    question: '원하는 연령대를 골라주세요',
    options: [
      {label: '20대', value: '20s'},
      {label: '30대', value: '30s'},
      {label: '40대', value: '40s'},
      {label: '50대 이상', value: '50s and over'},
    ],
  },
  {
    question: '원하는 체형을 골라주세요',
    options: [
      {label: '마른 체형', value: 'slim'},
      {label: '통통한 체형', value: 'chubby'},
      {label: '근육질 체형', value: 'muscular'},
      {label: '상관 없음', value: 'natural face'},
    ],
  },
  {
    question: '원하는 얼굴형을 골라주세요',
    options: [
      {label: '둥근형', value: 'round face'},
      {label: '계란형', value: 'oval face'},
      {label: '각진형', value: 'angular face'},
      {label: '상관 없음', value: 'natural face'},
    ],
  },
  {
    question: '원하는 피부색을 골라주세요',
    options: [
      {label: '밝고 환한 밀크 톤', value: 'bright milk skin'},
      {
        label: '자연스러운 미디엄 다크 톤',
        value: 'natural medium dark skin',
      },
      {label: '태닝한 듯 건강한 다크 톤', value: 'tanned dark skin'},
      {label: '상관 없음', value: 'natural skin tone'},
    ],
  },
  {
    question: '원하는 눈 모양을 골라주세요',
    options: [
      {label: '매력만점 무쌍', value: 'monolid eyes'},
      {label: '자연스러운 속쌍', value: 'double eyelid eyes'},
      {label: '쌍커풀 짙은 큰 눈', value: 'deep double eyelid eyes'},
      {label: '상관 없음', value: 'simple eyes'},
    ],
  },
  {
    question: '원하는 머리 스타일을 골라주세요',
    options: [
      {label: '깔끔한 짧은 머리', value: 'short'},
      {label: '덮은머리', value: 'with front bangs'},
      {label: '한껏 꾸민 포마드', value: 'pompadour'},
      {label: '뽀글이 펌', value: 'poppy perm'},
      {label: '느낌 있는 장발', value: 'long'},
      {label: '상관 없음', value: 'natural straight hair'},
    ],
  },
  {
    question: '원하는 머리 색을 골라주세요',
    options: [
      {label: '자연스러운 게 최고! 흑발', value: 'black hair'},
      {label: '초콜릿 같은 갈색 머리', value: 'brown hair'},
      {label: '개성 있는 금발', value: 'blonde hair'},
      {label: '강렬한 빨간머리', value: 'red hair'},
      {label: '자유로운 영혼, 컬러풀 헤어', value: 'colorful hair'},
      {label: '상관 없음', value: 'natural color hair'},
    ],
  },
  {
    question: '원하는 옷 스타일을 골라주세요',
    options: [
      {label: '심플한 캐주얼룩', value: 'simple casual style'},
      {label: '깔끔한 정장', value: 'suit'},
      {label: '힙한 mz룩', value: 'hip hop style'},
      {label: '편한 트레이닝복', value: 'sports style'},
      {label: '상관 없음', value: 'simple casual style'},
    ],
  },
];
