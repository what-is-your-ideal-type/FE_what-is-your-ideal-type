import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-bg p-4">
      <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-16">
        <section className="flex flex-col items-center space-y-8">
          <div className="flex items-center justify-center w-48 h-48 bg-white rounded-full">
            <span className="text-2xl font-bold">Logo</span>
          </div>
          <Link
            to="/survey"
            className="w-48 h-12 py-3 bg-main text-white text-center rounded-md"
          >
            로그인 없이 시작
          </Link>
        </section>
        <section className="flex flex-col items-center p-8 space-y-4 bg-[#e9e7e2] rounded-lg">
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            className="w-64 h-12 px-4 py-2 bg-white rounded-md"
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="w-64 h-12 px-4 py-2 bg-white rounded-md"
          />
          <button className="w-64 h-12 py-3 bg-gray text-white rounded-md">
            로그인하기
          </button>
          <Link
            to="/signup"
            className="w-64 h-12 py-3 bg-gray text-white text-center rounded-md"
          >
            회원가입하기
          </Link>
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
