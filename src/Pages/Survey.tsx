import React, { useState, useEffect } from "react";

type Survey = {
  question: string;
  options: string[];
};

const gender: Survey = {
  question: "원하는 성별을 골라주세요",
  options: ["남자", "여자"],
};

// 성별이 여자인 경우 설문내용
const surveyContentsWomen: Survey[] = [
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
const surveyContentsMen: Survey[] = [
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

const Survey = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<string[]>([]);
  // 성별에 따른 현재 설문내용 선언
  const currentSurvey =
    selectedGender === "남자" ? surveyContentsMen : surveyContentsWomen;

  // 성별 선택 핸들러
  const handleGenderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gender = event.target.value;
    setSelectedGender(gender);
  };

  // 옵션 선택 핸들러
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponses((prev) => prev.concat(event.target.value))
    // setResponses((prev) => [...prev, event.target.value]
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    // 옵션을 선택하면 자동으로 다음 페이지로 넘어가기
  };

  useEffect(() => {
    if (currentQuestionIndex === currentSurvey.length) {
      alert("응답을 제출하시겠습니까?");
      handleSubmit();
    }
  },[currentQuestionIndex])

  // 응답 제출 핸들러 (제출하는 코드 추가해야 함)
  const handleSubmit = () => {
    console.log("응답내용 : ", responses);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
      {!selectedGender ? (
        <>
          <div className="bg-none p-8">
            <h2 className="text-2xl mb-4">{gender.question}</h2>
          </div>
          <div className="w-52 flex justify-between items-center">
            {gender.options.map((option) => (
              <div key={option} className="mb-2 flex">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  id={option}
                  onChange={handleGenderSelect}
                  className="mr-2 hidden"
                />
                <label
                  htmlFor={option}
                  className="bg-main hover:bg-sub flex justify-center items-center p-3 mb-5 text-white rounded-lg w-20 shadow-md cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </>
      ) : currentQuestionIndex < currentSurvey.length ? (
        <div className="bg-none p-8">
          <div className="mt-4 w-full flex justify-center">
            <div className="w-96">
              <progress
                value={currentQuestionIndex + 1}
                max={currentSurvey.length}
                className="appearance-none w-full h-2 rounded-full mb-20 progress-bar progress-unfilled:bg-sub progress-filled:bg-main"
              ></progress>
            </div>
          </div>
          <h2 className="flex justify-center items-center text-2xl mb-20">
            {currentSurvey[currentQuestionIndex].question}
          </h2>
          <div className="grid grid-cols-2">
            {currentSurvey[currentQuestionIndex].options.map((option) => (
              <div key={option} className="mb-2 flex justify-center items-center">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  id={option}
                  checked={responses[currentQuestionIndex] === option}
                  onChange={handleOptionChange}
                  className="mr-2 hidden"
                />
                <label
                  htmlFor={option}
                  className="bg-main hover:bg-sub flex justify-center items-center p-3 mb-5 text-white rounded-lg shadow-md cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-10"></div>
        </div>
      ) : null}
    </div>
  );
};

export default Survey;
