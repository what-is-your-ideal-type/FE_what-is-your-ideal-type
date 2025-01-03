import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Main } from "../components/ui/Main";
import Input from "../components/ui/Input";
import { useAuth } from "../contexts/AuthContext";
import { ButtonGroup } from "../styles/styled";
import { FlexBox } from "../components/ui/FlexBox";
import { Text } from "../components/ui/Text";
import { FirebaseError } from "firebase/app";
import { useResponsive } from "../hooks/useResponsive";
import FindPasswordModal from "../components/functional/FindPasswordModal";
import NavigateToSurvey from "../components/functional/NavigateToSurvey";
import { loginWithGoogle } from "../services/auth/loginWithGoogle";
import { loginWithEmail } from "../services/auth/loginWithEmail";
const Home = () => {
  const navigate = useNavigate();
  const isMobile = useResponsive();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleLoginWithEmail = async () => {
    try {
      const userCredential = await loginWithEmail(email, password);
      if (userCredential) {
        setCurrentUser(userCredential.user);
        alert("로그인에 성공했습니다.");
        navigate("/mypage");
      }
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

  const handleLoginWithGoogle = async () => {
    try {
      const credential = await loginWithGoogle();
      if (credential) {
        setCurrentUser(credential.user);
        alert("로그인에 성공했습니다.");
        navigate("/mypage");
      }
    } catch (error) {
      console.error("Error handleLoginWithGoogle: ", error);
    }
  };

  return (
    <Main isMobile={isMobile} gap="8rem">
      <FlexBox direction="column" gap="2rem">
        <FlexBox
          direction="column"
          gap="1rem"
          style={{ alignItems: "flex-start", width: "100%" }}
        >
          <Text fontSize="lg" fontWeight="bold">
            안녕하세요!
          </Text>
          <Text fontSize="md" fontWeight="bold">
            나만의 이상형을 찾아 볼까요?
          </Text>
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
        {error ? (
          <Text fontSize="md" color="red">
            {error}
          </Text>
        ) : null}
        <button
          style={{ marginRight: "0.5rem", marginLeft: "auto" }}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          비밀번호 찾기
        </button>
        <Button
          bgColor="main"
          label="로그인하기"
          width="100%"
          onClick={handleLoginWithEmail}
        >
          로그인하기
        </Button>
        <NavigateToSurvey label="로그인 없이 시작" />
      </FlexBox>
      <FlexBox direction="column" gap="8rem">
        <div>
          <Text style={{ marginBottom: "12px" }} fontSize="md">
            SNS 계정으로 간편하게 시작하기
          </Text>
          <ButtonGroup>
            <Button
              label="구글 로그인"
              bgColor="white"
              onClick={handleLoginWithGoogle}
            >
              <img src="/src/assets/images/google.png" alt="구글 로그인" />
            </Button>
            <Button label="카카오 로그인" bgColor="white">
              <img src="/images/kakao.png" alt="카카오 로그인" />
            </Button>
            <Button label="네이버 로그인" bgColor="white">
              <img src="/images/naver.png" alt="네이버 로그인" />
            </Button>
          </ButtonGroup>
        </div>
        <FlexBox gap="1rem">
          <Text fontSize="md">이상형 찾기가 처음이라면?</Text>
          <Button
            label="회원가입"
            style={{
              color: "#706EF4",
              background: "inherit",
              fontWeight: "bold",
              borderBottom: "1px solid",
              borderRadius: "0px",
              padding: "0px",
            }}
            onClick={() => navigate("signup")}
          >
            가입하기
          </Button>
        </FlexBox>
      </FlexBox>
      <FindPasswordModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Main>
  );
};

export default Home;
