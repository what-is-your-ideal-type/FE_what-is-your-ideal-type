import React, { useState, useEffect } from "react";
import {
  surveyContentsMen,
  surveyContentsWomen,
  genderTheme,
} from "../components/Survey";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { mainButtonArgs } from "../components/ButtonArgs";

type Gender = "man" | "woman";

const Survey = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [prompts, setprompts] = useState<string[]>([]);
  const [hashtags, setHashTags] = useState<string[]>([]);

  const currentSurvey =
    selectedGender === "man" ? surveyContentsMen : surveyContentsWomen;

  const handleGenderSelect = (genderEng: Gender, genderKor: "남자" | "여자") => {
    setprompts((prev) => prev.concat(genderEng));
    setHashTags((prev) => prev.concat(genderKor));
    setSelectedGender(genderEng);
  };

  const handleOptionChange = (valueEng: string, valueKor: string) => {
    setprompts((prev) => prev.concat(valueEng));
    setHashTags((prev) => prev.concat(valueKor));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = () => {
    navigate("/generate", { state: { prompts: prompts, hashTags: hashtags } });
  };

  const handleBack = () => {
    if(prompts.length === 1){
      setSelectedGender(null)
      setprompts([])
      setHashTags([])
    }else{
      setprompts((prev) => prev.slice(0, prev.length - 1));
      setHashTags((prev) => prev.slice(0, prev.length - 1));
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  }

  useEffect(() => {
    if (currentQuestionIndex === currentSurvey.length) {
      const confirmSubmit = confirm("제출하시겠습니까?");
      if (confirmSubmit) {
        handleSubmit();
      } else {
        alert("요청이 잘못 되었습니다.");
      }
    }
  }, [currentQuestionIndex, currentSurvey.length]);

  const renderGenderSelection = () => (
    <>
      <div className="bg-none p-8">
        <h2 className="text-2xl mb-4">{genderTheme.question}</h2>
      </div>
      <div className="w-52 flex justify-between items-center">
        {genderTheme.options.map((option) => (
          <Button
            key={option.label}
            label={option.label}
            type="button"
            {...mainButtonArgs}
            onClick={() => handleGenderSelect(option.value, option.label)}
          />
        )
      )}
      </div>
    </>
  );

  const renderSurveyQuestion = () => (
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
          <div key={option.label} className="mb-2 flex justify-center items-center">
            <Button
              label={option.label}
              type="button"
              {...mainButtonArgs}
              onClick={() => handleOptionChange(option.value, option.label)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-10"></div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg">
      {prompts.length > 0 ? 
        <button onClick={handleBack}>뒤로가기</button>
      : null}
      {!selectedGender
        ? renderGenderSelection()
        : currentQuestionIndex < currentSurvey.length
        ? renderSurveyQuestion()
        : null}
    </div>
  );
};

export default Survey;
