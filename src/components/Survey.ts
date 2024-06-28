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
      question: "원하는 키를 골라주세요",
      options: ["150cm 이하", "151-160cm", "161-170cm", "170cm 이상"],
    },
    {
      question: "원하는 몸무게를 골라주세요",
      options: [
        "50kg 이하",
        "50-55kg",
        "55-60kg",
        "60-65kg",
        "65-70kg",
        "70kg 이상",
      ],
    },
    {
      question: "원하는 머리 길이를 골라주세요",
      options: ["숏컷", "단발", "중단발", "긴머리"],
    },
    {
      question: "원하는 머리 스타일을 골라주세요",
      options: ["생머리", "자연스러운 웨이브", "히피펌"],
    },
    {
      question: "원하는 눈 모양을 골라주세요",
      options: ["무쌍", "속쌍", "쌍커풀 짙은 눈"],
    },
    {
      question: "원하는 피부색을 골라주세요",
      options: [
        "도자기처럼 하얀 피부색",
        "너무 밝지도 어둡지도 않은 자연스러운 피부색",
        "건강미 있는 까무잡잡한 피부색",
      ],
    },
  ];
  
  // 성별이 남자인 경우 설문내용
  export const surveyContentsMen: Survey[] = [
    {
      question: "원하는 연령대를 골라주세요",
      options: ["10대", "20대", "30대", "40대", "50대 이상"],
    },
    {
      question: "원하는 키를 골라주세요",
      options: ["170cm 이하", "171-175cm", "176-180cm", "180cm 이상"],
    },
    {
      question: "원하는 몸무게를 골라주세요",
      options: ["60kg 이하", "61-70kg", "71-80kg", "81-90kg", "90kg 이상"],
    },
    {
      question: "원하는 머리 스타일을 골라주세요",
      options: ["스포츠컷", "평범한 스타일", "느낌 있는 장발"],
    },
    {
      question: "원하는 눈 모양을 골라주세요",
      options: ["무쌍", "속쌍", "쌍커풀 짙은 눈"],
    },
    {
      question: "원하는 피부색을 골라주세요",
      options: [
        "도자기처럼 하얀 피부색",
        "너무 밝지도 어둡지도 않은 자연스러운 피부색",
        "건강미 있는 까무잡잡한 피부색",
      ],
    },
  ];