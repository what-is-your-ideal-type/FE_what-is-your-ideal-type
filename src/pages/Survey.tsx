import React, { useState, useEffect } from "react";
import {
  SurveyTypes,
  surveyContentsMen,
  surveyContentsWomen,
} from "../components/utils/Survey";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Header } from "../components/ui/Header";
import { ProgressBar } from "../styles/styled";
import { FlexBox } from "../components/ui/FlexBox";
import { Text } from "../components/ui/Text";
import { Main } from "../components/ui/Main";
import styled, { keyframes } from "styled-components";

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const QuestionContainer = styled.div`
  animation: ${slideInRight} 0.5s ease-in-out;
`;

const Survey = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSurvey, setCurrentSurvey] = useState<SurveyTypes[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [prompts, setprompts] = useState<string[]>([]);
  const [hashtags, setHashTags] = useState<string[]>([]);
  const gender = location.state;

  const handleOptionChange = (valueEng: string, valueKor: string) => {
    setprompts((prev) => prev.concat(valueEng));
    setHashTags((prev) => prev.concat(valueKor));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmit = () => {
    const check = confirm("이상형을 생성하겠습니까?");
    const promptObj = {
      gender: gender,
      age: prompts[0],
      bodyShape: prompts[1],
      faceShape: prompts[2],
      skinTone: prompts[3],
      eyesShape: prompts[4],
      hairStyle: prompts[5],
      hairColor: prompts[6],
      outfit: prompts[7],
    };
    if (check) {
      navigate("/generate", {
        state: { prompts: promptObj, hashTags: hashtags },
      });
    } else {
      setprompts((prev) => prev.slice(0, prev.length - 1));
      setHashTags((prev) => prev.slice(0, prev.length - 1));
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  useEffect(() => {
    if (!gender) {
      alert("성별을 먼저 선택해주세요");
      navigate("/genderselect");
    }
    if (gender === "man") {
      setCurrentSurvey(surveyContentsMen);
    } else {
      setCurrentSurvey(surveyContentsWomen);
    }
  }, [location]);

  useEffect(() => {
    if (
      currentSurvey.length > 0 &&
      currentQuestionIndex >= 0 &&
      currentQuestionIndex === currentSurvey.length
    ) {
      handleSubmit();
    }
  }, [currentQuestionIndex, currentSurvey.length]);

  return (
    <>
      <div style={{ position: "absolute", top: "0", width: "100%" }}>
        <Header />
        <ProgressBar
          value={
            currentSurvey.length > 0
              ? (currentQuestionIndex / currentSurvey.length) * 100
              : 0
          }
        ></ProgressBar>
      </div>
      <Main>
        {currentSurvey[currentQuestionIndex] ? (
          // Assign a unique key based on the current question index
          <QuestionContainer key={currentQuestionIndex}>
            <FlexBox direction="column" gap="72px">
              <Text fontSize="lg" fontWeight="bold">
                {currentSurvey[currentQuestionIndex].question}
              </Text>
              <FlexBox direction="column" gap="10px">
                {currentSurvey[currentQuestionIndex].options.map((option) => (
                  <div
                    key={option.label}
                    className="mb-2 flex justify-center items-center"
                  >
                    <Button
                      width="344px"
                      height="52px"
                      onClick={() => {
                        handleOptionChange(option.value, option.label);
                      }}
                    >
                      {option.label}
                    </Button>
                  </div>
                ))}
              </FlexBox>
            </FlexBox>
          </QuestionContainer>
        ) : null}
      </Main>
    </>
  );
};

export default Survey;
