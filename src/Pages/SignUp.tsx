import React from "react"

const SignUp = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-bg p-4">
      <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-16">
        <section className="flex flex-col items-center space-y-8">
          <div className="flex items-center justify-center w-48 h-48 bg-white rounded-full">
            <span className="text-2xl font-bold">Logo</span>
          </div>
          <button className="w-48 h-12 bg-main text-white">로그인 없이 시작</button>
        </section>
        <section className="flex flex-col items-center p-8 space-y-4 bg-[#e9e7e2] rounded-lg">
          <input type="email" placeholder="이메일을 입력해주세요" className="w-64 h-12 px-4 py-2 bg-white rounded-md" />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="w-64 h-12 px-4 py-2 bg-white rounded-md"
          />
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            className="w-64 h-12 px-4 py-2 bg-white rounded-md"
          />
          <section className="flex w-64 h-12 justify-center items-center">
            <p className="text-red-700">중복된 이메일이 있습니다.</p>
          </section>
          <section className="flex space-x-4">
            <button className="w-64 h-12 bg-gray-300 text-gray-700">회원가입하기</button>
          </section>
        </section>
      </section>
    </main>
  )
}

export default SignUp
