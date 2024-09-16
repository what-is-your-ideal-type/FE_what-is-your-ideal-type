import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Picture from "../components/ui/Picture";
import Kakaoshare from "../components/functional/KakaoShare";
import NavigateToSurvey from "../components/functional/NavigateToSurvey";
import { PreventDefaultWrapper } from "../components/functional/PreventDefaultWrapper";
import { Button } from "../components/ui/Button";
import { Text } from "../components/ui/Text";
import { FlexBox } from "../components/ui/FlexBox";
import { Main } from "../components/ui/Main";
import { parseProfile } from "../services/profileGenerator";

interface Profile {
  name: string;
  age: number;
  occupation: string;
  personality: string;
  hobbies: string;
}

const Result = () => {
  const { prompts, url } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [imageProfile, setImageProfile] = useState<Profile | null>(null);
  const currentUser = useAuth();
  const location = useLocation();
  const { fileName, profile } = location.state || {};
  const navigate = useNavigate();
  const isLogin = currentUser.currentUser;

  useEffect(() => {
    const result = parseProfile(profile);
    setImageProfile(result);
  }, [profile]);

  useEffect(() => {
    if (prompts === undefined || url === undefined) {
      return;
    }

    const replacedURL = url.replace("/o/images/", "/o/images%2F");
    const decodedPrompts = decodeURIComponent(prompts);

    setImageUrl(replacedURL);
    setPrompt(decodedPrompts);
  }, [url, prompts]);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = URL.createObjectURL(blob);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          const url = window.URL.createObjectURL(blob!);
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName || "download_image.webp";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, "image/webp");
      };
    } catch (error) {
      console.error("Error downloading the image: ", error);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 클립보드에 복사되었습니다. 원하는 곳에 붙여넣기 해주세요.");
    } catch (error) {
      console.error("Failed to copy link : ", error);
      alert("링크 복사에 실패했습니다.");
    }
  };

  const handleNavigate = (pagePath: string) => {
    navigate(pagePath);
  };

  return (
    <Main>
      <FlexBox direction="column" gap="47px">
        <FlexBox direction="column" gap="2px">
          <Text fontWeight="bold">26세 나현아</Text>
          <Text fontSize="lg" fontWeight="bold">패션 인플루언서</Text>
        </FlexBox>
          <PreventDefaultWrapper>
            <Picture imageUrl={imageUrl} altText="이상형 이미지" />
          </PreventDefaultWrapper>
      </FlexBox>
      <FlexBox direction="column">
        <Text fontWeight="bold">{prompt}</Text>

        {isLogin ? (
          <>
            <Button onClick={() => handleNavigate("/mypage")}>마이 페이지</Button>
            <NavigateToSurvey label="이상형 다시 찾기" />
          </>
        ) : (
          <>
            <p className="text-gray">
              사진을 저장하고 기록하고 싶다면 로그인 해보세요
            </p>
            <Button onClick={() => handleNavigate("/")}>로그인</Button>
          </>
        )}
        <PreventDefaultWrapper>
          {isLogin && (
            <Button onClick={handleDownload}>
              <img src="/images/icon-photo.png" alt="사진저장 아이콘" />
            </Button>
          )}
          <Button onClick={handleShare}>
            <img src="/images/icon-share.png" alt="공유 아이콘" />
          </Button>
          <Kakaoshare />
        </PreventDefaultWrapper>
      </FlexBox>
    </Main>
  );
};

export default Result;
