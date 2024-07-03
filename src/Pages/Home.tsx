import React from "react";
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
          <Input type="email" placeholder="이메일을 입력해주세요" />
          <Input type="password" placeholder="비밀번호를 입력해주세요" />
          <Button label="로그인하기" {...authButtonArgs} />
          <Button label="회원가입하기" {...authButtonArgs} />
          <section className="flex space-x-4">
            <Button label="카카오" {...kakaoButtonArgs} />
            <Button label="네이버" {...naverButtonArgs} />
            <Button label="구글" {...googleButtonArgs} />
          </section>
        </section>
      </section>
    </main>
  );
};

export default Home;
