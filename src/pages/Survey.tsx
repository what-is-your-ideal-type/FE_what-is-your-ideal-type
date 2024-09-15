import React, { useState, useEffect } from "react";
import {
  SurveyTypes,
  surveyContentsMen,
  surveyContentsWomen,
} from "../components/Survey";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Main, ProgressBar } from "../styles/styled";
import { FlexBox } from "../styles/FlexBox";
import { Text } from "../styles/Text";

const Survey = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSurvey, setCurrentSurvey] = useState<SurveyTypes[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [prompts, setprompts] = useState<string[]>([]);
  const [hashtags, setHashTags] = useState<string[]>([]);



  const handleOptionChange = (valueEng: string, valueKor: string) => {
    setprompts((prev) => prev.concat(valueEng));
    setHashTags((prev) => prev.concat(valueKor));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = () => {
    const check = confirm('이상형을 생성하겠습니까?')
    if(check){
      navigate("/generate", { state: { prompts: prompts, hashTags: hashtags } });
    }else{
      return
    }
  };

  const handleBack = () => {
      setprompts((prev) => prev.slice(0, prev.length - 1));
      setHashTags((prev) => prev.slice(0, prev.length - 1));
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    const gender = location.state;
    if(!gender){
      alert('성별을 먼저 선택해주세요')
      navigate('/genderselect')
    }

    if(gender === "man"){
      setCurrentSurvey(surveyContentsMen)
    } else{
      setCurrentSurvey(surveyContentsWomen)
    }

  }, [location]);

  return (
    <>
      <div style={{position: "absolute", top: "0", width: "100%"}}>
        <Header></Header>
          <ProgressBar
            value={currentQuestionIndex ? currentQuestionIndex : 0}
            ></ProgressBar>
      </div>
        <Main>
        {currentSurvey[currentQuestionIndex] ? 
          <FlexBox direction="column" gap="72px">
            <Text fontSize="lg" fontWeight="bold">{currentSurvey[currentQuestionIndex].question}</Text>
            <FlexBox direction="column" gap="10px">
              {currentSurvey[currentQuestionIndex].options.map((option, index) => (
                <div
                  key={option.label}
                  className="mb-2 flex justify-center items-center"
                >
                  <Button
                    width="344px"
                    height="52px"
                    onClick={() => {
                      currentQuestionIndex === currentSurvey.length - 1 
                      ? handleSubmit() 
                      : handleOptionChange(option.value, option.label)
                    }
                    }
                  >{option.label}</Button>
                </div>
              ))}
            </FlexBox>
        </FlexBox>
      : null}
      </Main>
    </>
  );
};

export default Survey;