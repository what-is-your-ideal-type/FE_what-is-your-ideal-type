import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Picture from "../components/ui/Picture";
import Kakaoshare from "../components/functional/KakaoShare";
import NavigateToSurvey from "../components/functional/NavigateToSurvey";
import { PreventDefaultWrapper } from "../components/functional/PreventDefaultWrapper";
import { Button } from "../components/ui/Button";
import { Text } from "../components/ui/Text";
import { FlexBox } from "../components/ui/FlexBox";
import { Main } from "../components/ui/Main";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../firebase";


interface ProfileTypes {
  name: string;
  age: number;
  occupation: string;
  personality: string;
  hobbies: string;
}


const Result = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<DocumentData | null>(null)
  const [profile, setProfile] = useState<ProfileTypes | null>(null)
  const currentUser = useAuth();
  const navigate = useNavigate()
  const isLogin = currentUser.currentUser;

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const postDocRef = doc(db, "posts", postId);
          const postSnapshot = await getDoc(postDocRef);

          if (!postSnapshot.exists()) return
          
          setPost(postSnapshot.data());
        } catch (error) {
          console.error("Error fetching document: ", error);
        }
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    if(!post) return

    const jsonData = JSON.parse(post.profile)
    setProfile(jsonData)
  },[post])

  // 뒤로가기 방지
  useEffect(() => {
    const blockBackButton = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", blockBackButton);

    return () => {
      window.removeEventListener("popstate", blockBackButton);
    };
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(post?.imageUrl);
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
          a.download = `img_${postId}.webp`;
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

  return (
    <Main>
      <FlexBox direction="column" gap="47px">
        <FlexBox direction="column" gap="2px">
          <Text fontWeight="bold">
            {profile?.age} {profile?.name}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {profile?.occupation}
          </Text>
        </FlexBox>
        <PreventDefaultWrapper>
          <Picture imageUrl={post?.imageUrl} altText="이상형 이미지" />
        </PreventDefaultWrapper>
      </FlexBox>
      <FlexBox direction="column">
        <Text fontWeight="bold">성격: {profile?.personality}</Text>
        <Text fontWeight="bold">취미: {profile?.hobbies}</Text>

        {isLogin ? (
          <>
            <Button onClick={() => navigate("/mypage")}>
              마이 페이지
            </Button>
            <NavigateToSurvey label="이상형 다시 찾기" />
          </>
        ) : (
          <>
            <p className="text-gray">
              사진을 저장하고 기록하고 싶다면 로그인 해보세요
            </p>
            <Button onClick={() => navigate("/")}>로그인</Button>
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
