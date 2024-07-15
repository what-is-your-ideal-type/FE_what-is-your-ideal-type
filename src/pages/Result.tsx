import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { mainButtonArgs } from "../components/ButtonArgs";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Result = () => {
  const { prompts, url } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const currentUser = useAuth();

  useEffect(() => {
    if ( prompts === undefined || url === undefined) {
      return;
    }

    const replacedURL = url.replace('/o/images/', '/o/images%2F');
    const decodedPrompts = decodeURIComponent(prompts);


    setImageUrl(replacedURL);
    setPrompt(decodedPrompts);
    setDownloadUrl(url)
  }, [url, prompts]);


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
          <picture>
            <source 
              srcSet={`${imageUrl}.webp 320w,
                      ${imageUrl}.webp 480w,
                      ${imageUrl}.webp 800w,
                      ${imageUrl}.webp 1024w`}
              sizes="(max-width: 320px) 280px, 
                    (max-width: 480px) 440px, 
                    (max-width: 600px) 500px, 
                    (max-width: 800px) 760px, 
                    1024px"
              type="image/webp"
            />
            <img 
              src={`${imageUrl}.jpg`} 
              alt="이상형 이미지" 
              className="rounded-lg"
              style={{  
                width: "100%",
                height: "auto",
                maxWidth: "1024px", 
                maxHeight: "1024px"
              }}
              loading="lazy"
            />
        </picture>
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
          {/* 로그인 인증에 따른 코드 추가 필요 */}
          {downloadUrl && (
            <button
              onClick={() => {
                window.open(downloadUrl);
              }}
              className="size-8 mr-6"
            >
              <img src="/images/icon-photo.png" alt="사진저장 아이콘" />
            </button>
          )}
          <button className="size-8" onClick={handleShare}>
            <img src="/images/icon-share.png" alt="공유 아이콘" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;