import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  mainButtonArgs,
  authButtonArgs,
  kakaoButtonArgs,
  naverButtonArgs,
  googleButtonArgs,
} from "../components/ButtonArgs";
import { useAuth } from "../contexts/AuthContext";
import NavigateToSurvey from "../components/NavigateToSurvey";
import { getCountAndTimeLeft } from "../services/countService";
import { AuthSection, ButtonGroup, ErrorMessage, InnerSection, LogoContainer, Main } from "../styles/styled";
import { FlexBox } from "../styles/FlexBox";
import { Text } from "../styles/Text";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { currentUser, setCurrentUser } = useAuth();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("User logged in: ", userCredential.user);
      setCurrentUser(userCredential.user);
      alert("로그인에 성공했습니다.");

      navigate("/mypage");
    } catch (error: any) {
      // 예외 처리
      switch (error.code) {
        case "auth/invalid-credential":
          return setError("이메일 또는 비밀번호를 확인해주세요");
        default:
          return setError("입력 정보를 확인해주세요");
      }
    }
  };

  const handleLogout = async () => {
    if (confirm("로그아웃 하시겠어요?")) {
      await signOut(auth)
        .then(() => {
          setEmail("");
          setPassword("");
          console.log("Signout successful");
        })
        .catch((error) => {
          console.error("Failed to signOut", error);
        });
    }
  };

  return (
    <Main>
      <FlexBox direction="column" gap="2rem">
        <FlexBox direction="column" gap="1rem" style={{alignItems: "flex-start", width: "100%"}}>
          <Text fontSize="lg" fontWeight="bold">안녕하세요!</Text>
          <Text fontSize="md" fontWeight="bold">나만의 이상형을 찾아 볼까요?</Text>
        </FlexBox>  
        <FlexBox direction="column" gap="1rem">
          <Input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </FlexBox>
        <Button label="로그인하기" type="submit" {...authButtonArgs} />
      </FlexBox>
        <ButtonGroup>
          <Button label="카카오" type="button" {...kakaoButtonArgs} />
          <Button label="네이버" type="button" {...naverButtonArgs} />
          <Button label="구글" type="button" {...googleButtonArgs} />
        </ButtonGroup>
    </Main>
  );
};

export default Home;