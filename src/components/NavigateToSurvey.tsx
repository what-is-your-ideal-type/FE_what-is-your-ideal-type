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
      alert(
        "이미지 생성 횟수를 초과했습니다. 더 많은 횟수를 원하시면 로그인 해주세요.",
      );
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
