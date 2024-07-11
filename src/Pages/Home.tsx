import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
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

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { currentUser, setCurrentUser } = useAuth();

  const onSubmit = async (event: React.FormEvent) => {
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
      navigate("/survey");
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

  return (
    <main className="flex items-center justify-center min-h-screen bg-bg p-4">
      <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-16">
        <section className="flex flex-col items-center space-y-8">
          <div className="flex items-center justify-center w-48 h-48 bg-white rounded-full">
            <span className="text-2xl font-bold">Logo</span>
          </div>
          <Button
            label="로그인 없이 시작"
            type="button"
            {...mainButtonArgs}
            onClick={() => navigate("/survey")}
          />
        </section>
        <section className="flex flex-col items-center p-8 space-y-4 bg-[#e9e7e2] rounded-lg">
          <section>
            <form
              onSubmit={onSubmit}
              className="flex flex-col items-center space-y-4"
            >
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
              {error && <p className="text-red-700">{error}</p>}
              <Button label="로그인하기" type="submit" {...authButtonArgs} />
            </form>
          </section>
          <Link to="/signup">
            <Button label="회원가입하기" type="button" {...authButtonArgs} />
          </Link>
          <section className="flex space-x-8">
            <Button label="카카오" type="button" {...kakaoButtonArgs} />
            <Button label="네이버" type="button" {...naverButtonArgs} />
            <Button label="구글" type="button" {...googleButtonArgs} />
          </section>
        </section>
      </section>
    </main>
  );
};

export default Home;
