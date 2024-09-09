import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { mainButtonArgs } from "../components/ButtonArgs";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Picture from "../components/Picture";
import Kakaoshare from "../components/KakaoShare";
import NavigateToSurvey from "../components/NavigateToSurvey";
import { PreventDefaultWrapper } from "../components/PreventDefaultWrapper";
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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-bg">
      <div className="flex flex-col items-center px-4 space-y-4 max-w-lg">
        <h2 className="font-bold text-2xl">이런 스타일을 찾으셨나요?</h2>
        <PreventDefaultWrapper>
          <Picture imageUrl={imageUrl} altText="이상형 이미지" />
        </PreventDefaultWrapper>
      </div>
      <div className="flex flex-col items-center px-4 space-y-4 md:space-y-8 max-w-lg">
        {!imageProfile ? (
          <h3 className="font-bold pt-8">{prompt}</h3>
        ) : (
          <div className="font-bold pt-8">
            <p>이름: {imageProfile.name}</p>
            <p>나이: {imageProfile.age}</p>
            <p>직업: {imageProfile.occupation}</p>
            <p>성격: {imageProfile.personality}</p>
            <p>취미: {imageProfile.hobbies}</p>
          </div>
        )}
        {isLogin ? (
          <>
            <Button
              label={"마이페이지"}
              type="button"
              {...mainButtonArgs}
              onClick={() => handleNavigate("/mypage")}
            />
            <NavigateToSurvey label="이상형 다시 찾기" />
          </>
        ) : (
          <>
            <p className="text-gray">
              사진을 저장하고 기록하고 싶다면 로그인 해보세요
            </p>
            <Button
              label="로그인"
              type="button"
              {...mainButtonArgs}
              onClick={() => handleNavigate("/")}
            />
          </>
        )}
        <PreventDefaultWrapper>
          {isLogin && (
            <button onClick={handleDownload} className="size-8 mr-6">
              <img src="/images/icon-photo.png" alt="사진저장 아이콘" />
            </button>
          )}
          <button className="size-8 mr-6" onClick={handleShare}>
            <img src="/images/icon-share.png" alt="공유 아이콘" />
          </button>
          <Kakaoshare />
        </PreventDefaultWrapper>
      </div>
    </div>
  );
};

export default Result;
