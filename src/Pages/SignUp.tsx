import React from "react";
import Button from "../components/Button";
import { mainButtonArgs, authButtonArgs } from "../components/ButtonArgs";
import Input from "../components/Input";

const SignUp = () => {
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
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
          />
          <section className="flex w-64 h-12 justify-center items-center">
            <p className="text-red-700">중복된 이메일이 있습니다.</p>
          </section>
          <section className="flex space-x-4">
            <Button label="회원가입" {...authButtonArgs} />
          </section>
        </section>
      </section>
    </main>
  );
};

export default SignUp;
