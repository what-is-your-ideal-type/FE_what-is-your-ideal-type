type Survey = {
    question: string;
    options: string[];
  };
  
  export const genderTheme: Survey = {
    question: "원하는 성별을 골라주세요",
    options: ["남자", "여자"],
  };
  
  // 성별이 여자인 경우 설문내용
  export const surveyContentsWomen: Survey[] = [
    {
      question: "원하는 연령대를 골라주세요",
      options: ["10대", "20대", "30대", "40대", "50대 이상"],
    },
    {
      question: "원하는 체형을 골라주세요",
      options: ["마른 체형", "통통한 체형", "근육질 체형"]
    },
    {
      question: "원하는 머리 길이를 골라주세요",
      options: ["여자 숏컷", "단발", "중단발", "긴머리"],
    },
    {
      question: "원하는 머리 스타일을 골라주세요",
      options: ["생머리", "자연스러운 웨이브", "히피펌"],
    },
    {
      question: "원하는 얼굴형을 골라주세요",
      options: ["동그란 얼굴형", "계란 얼굴형", "갸름한 얼굴형", "타원형 얼굴형", "각진 얼굴형"]
    },
    {
      question: "원하는 눈 모양을 골라주세요",
      options: ["무쌍", "속쌍", "쌍커풀 짙은 눈"],
    },
    {
      question: "인종을 선택해주세요",
      options: ["황인", "백인", "흑인"]
    },
    {
      question: "옷 스타일을 골라주세요",
      options: ["캐주얼", "정장", "힙합", "드레스", "원피스"]
    },
    {
      question: "원하는 스타일을 골라주세요",
      options: [
        "귀여운 스타일",
        "청순한 스타일",
        "스포츠 스타일",
        "너드 스타일",
        "말괄량이 스타일"
      ]
    }
  ];
  
  // 성별이 남자인 경우 설문내용
  export const surveyContentsMen: Survey[] = [
    {
      question: "원하는 연령대를 골라주세요",
      options: ["10대", "20대", "30대", "40대", "50대 이상"],
    },
    {
      question: "원하는 체형을 골라주세요",
      options: ["마른 체형", "통통한 체형", "근육질 체형"]
    },
    {
      question: "원하는 머리 길이를 골라주세요",
      options: ["아주 짧은 머리", "짧은 머리", "보통 길이의 머리", "남자 긴머리"],
    },
    {
      question: "원하는 머리 스타일을 골라주세요",
      options: ["생머리", "곱슬머리", "덮은머리", "포마드 머리"],
    },
    {
      question: "원하는 얼굴형을 골라주세요",
      options: ["동그란 얼굴형", "계란 얼굴형", "갸름한 얼굴형", "타원형 얼굴형", "각진 얼굴형"]
    },
    {
      question: "원하는 눈 모양을 골라주세요",
      options: ["무쌍", "속쌍", "쌍커풀 짙은 눈"],
    },
    {
      question: "인종을 선택해주세요",
      options: ["황인", "백인", "흑인"]
    },
    {
      question: "옷 스타일을 골라주세요",
      options: ["캐주얼", "정장", "힙합", "작업복"]
    },
    {
      question: "원하는 스타일을 골라주세요",
      options: [
        "듬직한 스타일",
        "헬창 스타일",
        "너드 스타일",
        "귀여운 스타일",
        "마초 스타일"
      ]
    }
  ];