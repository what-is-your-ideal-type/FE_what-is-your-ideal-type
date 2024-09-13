import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "../components/Button"
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import { ButtonGroup, Main } from "../styles/styled";
import { FlexBox } from "../styles/FlexBox";
import { Text } from "../styles/Text";
import { FirebaseError } from "firebase/app";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { setCurrentUser } = useAuth();

  const handleLogin = async () => {
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
    } catch (error) {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case "auth/invalid-credential":
          return setError("이메일 또는 비밀번호를 확인해주세요");
        default:
          return setError("입력 정보를 확인해주세요");
      }
    }
  };

  return (
    <Main gap="8rem">
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
          {error ? <Text fontSize="md" color="red">{error}</Text> : null}
        <Button bgColor="main" label="로그인하기" onClick={handleLogin}>로그인하기</Button>
      </FlexBox>
      <FlexBox direction="column" gap="8rem">
        <div>
          <Text fontSize="md">SNS 계정으로 간편하게 시작하기</Text>
          <ButtonGroup>
            <Button label="구글 로그인" width="auto" height="auto">
              <img src="/images/google.png" alt="구글 로그인" />
            </Button>
            <Button label="카카오 로그인" width="auto" height="auto">
              <img src="/images/kakao.png" alt="카카오 로그인" />
            </Button>
            <Button label="네이버 로그인" width="auto" height="auto">
              <img src="/images/naver.png" alt="네이버 로그인" />
            </Button>
          </ButtonGroup>
        </div>
        <FlexBox gap="1rem">
          <Text fontSize="md">이상형 찾기가 처음이라면?</Text>
          <Button label="회원가입" bgColor="sub" width="auto" height="auto" onClick={() => navigate('signup')}>가입하기</Button>
        </FlexBox>
      </FlexBox>
    </Main>
  );
};

export default Home;