import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { mainButtonArgs } from "../components/ButtonArgs";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Picture from "../components/Picture";
import Kakaoshare from "../components/KakaoShare";

const Result = () => {
  const { prompts, url } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const currentUser = useAuth();
  const location = useLocation();
  const { fileName } = location.state || {};

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
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
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

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-bg">
      <div className="flex flex-col items-center px-4 space-y-4 max-w-lg">
        <h2 className="font-bold text-2xl">정호님의 이상형은</h2>
        <div>
          <Picture imageUrl={imageUrl} altText="이상형 이미지" />
        </div>
      </div>
      <div className="flex flex-col items-center px-4 space-y-4 md:space-y-8 max-w-lg">
        <h3 className="font-bold pt-8">{prompt}입니다</h3>
        {currentUser ? null : (
          <>
            <p className="text-gray">
              사진을 저장하고 기록하고 싶다면 로그인 해보세요
            </p>
            <Button label="로그인" type="submit" {...mainButtonArgs} />
          </>
        )}
        <div>
          {currentUser && (
            <button onClick={handleDownload} className="size-8 mr-6">
              <img src="/images/icon-photo.png" alt="사진저장 아이콘" />
            </button>
          )}
          <button className="size-8 mr-6" onClick={handleShare}>
            <img src="/images/icon-share.png" alt="공유 아이콘" />
          </button>
          <Kakaoshare />
        </div>
      </div>
    </div>
  );
};

export default Result;
