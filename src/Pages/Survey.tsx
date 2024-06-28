import React, { useState, useEffect } from "react";
import { surveyContentsMen, surveyContentsWomen, genderTheme } from "../components/Survey";

type Gender = "남자" | "여자"

const Survey = () => {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<string[]>([]);
  // 성별에 따른 현재 설문내용 선언
  const currentSurvey =
    selectedGender === "남자" ? surveyContentsMen : surveyContentsWomen;

  // 성별 선택 핸들러
  const handleGenderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gender = event.target.value as Gender;
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
      const handleConfirm = () => {
        const confirmSubmit = confirm("응답을 제출하시겠습니까?");
        if (confirmSubmit) {
          handleSubmit();
        }else{
          // 예외처리
        }
      };

      handleConfirm()
    }
  }, [currentQuestionIndex]);

  // 응답 제출 핸들러 (제출하는 코드 추가해야 함)
  const handleSubmit = () => {
    console.log("응답내용 : ", responses);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
      {!selectedGender ? (
        <>
          <div className="bg-none p-8">
            <h2 className="text-2xl mb-4">{genderTheme.question}</h2>
          </div>
          <div className="w-52 flex justify-between items-center">
            {genderTheme.options.map((option) => (
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
