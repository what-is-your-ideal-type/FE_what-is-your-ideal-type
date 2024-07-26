import React from "react";
import { useNavigate } from "react-router-dom";
import { getCountAndTimeLeft } from "../services/countService";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import { mainButtonArgs } from "./ButtonArgs";

interface NavigateToSurveyProps {
  label: string;
}

const NavigateToSurvey = ({ label }: NavigateToSurveyProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSurveyNavigation = async () => {
    const { count, limit, timeLeft } = await getCountAndTimeLeft(currentUser);

    if (count < limit) {
      navigate("/survey");
    } else if (!currentUser) {
      const confirmed = confirm("기본 이미지 생성 횟수를 초과했습니다. 로그인을 위해 로그인 페이지로 이동합니다.")
      if (confirmed) {
        navigate("/");
      }
    } else {
      alert(
        `이미지 생성 횟수를 초과했습니다. ${timeLeft.hours}시간 ${timeLeft.minutes}분 후에 이용해 주세요.`,
      );
    }
  };

  return (
    <Button
      label={label}
      type="button"
      {...mainButtonArgs}
      onClick={handleSurveyNavigation}
    />
  );
};

export default NavigateToSurvey;
