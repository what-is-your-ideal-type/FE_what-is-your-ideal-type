import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { mainButtonArgs } from "../components/ButtonArgs";
import { useLocation } from "react-router-dom";
import { uploadImageToFirebase } from "../services/uploadImage";

const Result = () => {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    const { url } = location.state;
    setImageUrl(url);
  }, []);

  // 로그인 인증에 따른 user 받아오는거 추가 예정
  useEffect(() => {
    const handleUpload = async () => {
      const userId = "userID1234";
      try {
        if (imageUrl.trim() !== "") {
          const url = await uploadImageToFirebase(imageUrl, userId);
          setDownloadUrl(url);
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    };
    handleUpload();
  }, [imageUrl]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-bg">
      <div className="flex flex-col items-center px-4 space-y-4 max-w-lg">
        <h4 className="text-gray">당신의 이상형은:</h4>
        <h2 className="font-bold text-2xl">마법사 유령</h2>
        <div>
          <img src={imageUrl} alt="이상형 이미지" className="rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col items-center px-4 space-y-4 md:space-y-8 max-w-lg">
        <h3 className="font-bold pt-8">
          당신의 이상형은 짧은 머리, 쌍커풀, 오똑한 코, 작은 입, 까만색 피부를
          가진 기운 넘치는 E_F_ 20대 남성입니다.
        </h3>
        <p className="text-gray">
          사진을 저장하고 기록하고 싶다면 로그인 해보세요
        </p>
        <Button label="로그인" type="submit" {...mainButtonArgs} />
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
          <button className="size-8">
            <img src="/images/icon-share.png" alt="공유 아이콘" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
