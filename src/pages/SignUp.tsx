import Input from "../components/Input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth, db, USERS_COLLECTION } from "../firebase";
import { doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { Button } from "../components/Button";
import { Main } from "../components/Main";
import { FlexBox } from "../components/FlexBox";
import { Text } from "../components/Text";
import { Header } from "../components/Header";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // 이메일 중복 검사
  const checkEmail = async () => {
    const q = query(USERS_COLLECTION, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) return setError("이미 사용 중인 이메일입니다.");
  };

  // 유저 정보 저장
  const saveUserInfo = async (uid: string) => {
    await setDoc(doc(db, "users", uid), {
      uid: uid,
      email: email,
      password: password,
    });
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      checkEmail();

      // 회원가입 처리
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      saveUserInfo(user.uid);

      alert("회원가입이 완료됐습니다.");
      navigate("/");
    } catch (err) {
      const error = err as AuthError;
      // firebase 오류 처리
      switch (error.code) {
        case "auth/user-not-found" || "auth/wrong-password":
          return setError("이메일 혹은 비밀번호가 일치하지 않습니다.");
        // case "auth/email-already-in-use":
        //   return setError("이미 사용 중인 이메일입니다.");
        case "auth/weak-password":
          return setError("비밀번호는 6글자 이상이어야 합니다.");
        case "auth/network-request-failed":
          return setError("네트워크 연결에 실패 하였습니다.");
        case "auth/invalid-email":
          return setError("잘못된 이메일 형식입니다.");
        case "auth/internal-error":
          return setError("잘못된 요청입니다.");
        default:
          return "회원가입에 실패 하였습니다.";
      }
    }
  };

  return (
    <>
      <Header></Header>
      <Main>
        <FlexBox direction="column" gap="32px">
          <FlexBox direction="column" gap="10px" style={{alignItems: "flex-start", width: "100%"}}>
            <Text fontSize="lg" fontWeight="bold">회원가입</Text>
            <Text fontSize="md">이상형을 찾기 위한 여정 시작</Text>
          </FlexBox>
            <FlexBox direction="column" gap="12px">
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
              <Input
                type="password"
                placeholder="비밀번호를 한번 더 입력해주세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
              {error ? <Text color="red">{error}</Text> : null}
            </FlexBox>
            <div style={{paddingTop: "32px", width: "100%"}}>
              <Button label="회원가입하기" bgColor="main" onClick={handleSignUp}>회원가입하기</Button>
            </div>
        </FlexBox>
      </Main>
    </>
  );
};

export default SignUp;
