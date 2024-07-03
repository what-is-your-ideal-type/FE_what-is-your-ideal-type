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

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
          <Button label="로그인 없이 시작" {...mainButtonArgs} />
        </section>
        <section className="flex flex-col items-center p-8 space-y-4 bg-[#e9e7e2] rounded-lg">
          <section>
            <form
              onSubmit={onSubmit}
              className="flex flex-col items-center space-y-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="이메일"
                placeholder="이메일을 입력해주세요"
                className="w-64 h-12 px-4 py-2 bg-white rounded-md"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="비밀번호"
                placeholder="비밀번호를 입력해주세요"
                className="w-64 h-12 px-4 py-2 bg-white rounded-md"
              />
              {error && <p className="text-red-700">{error}</p>}
              <button
                type="submit"
                className="w-64 h-12 py-3 bg-gray text-white rounded-md"
              >
                로그인하기
              </button>
            </form>
          </section>

          <section className="w-64 h-12 py-3 bg-gray text-white text-center rounded-md">
            <Link to="/signup">회원가입하기</Link>
          </section>
          <section className="flex space-x-8">
            <button className="w-16 h-16 bg-yellow-400 rounded-md">
              카카오
            </button>
            <button className="w-16 h-16 bg-green-500 rounded-md">
              네이버
            </button>
            <button className="w-16 h-16 bg-white rounded-md">구글</button>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Home;
