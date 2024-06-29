import React, { useState } from "react";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입이 완료됐습니다.");
    } catch (err) {
      const error = err as AuthError;
      // 오류 처리
      switch (error.code) {
        case "auth/user-not-found" || "auth/wrong-password":
          return setError("이메일 혹은 비밀번호가 일치하지 않습니다.");
        case "auth/email-already-in-use":
          return setError("이미 사용 중인 이메일입니다.");
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
    <main className="flex items-center justify-center min-h-screen bg-bg p-4">
      <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-16">
        <section className="flex flex-col items-center space-y-8">
          <div className="flex items-center justify-center w-48 h-48 bg-white rounded-full">
            <span className="text-2xl font-bold">Logo</span>
          </div>
        </section>
        <section>
          <form
            onSubmit={handleSignUp}
            className="flex flex-col items-center p-8 space-y-4 bg-[#e9e7e2] rounded-lg"
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
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-label="비밀번호 확인"
              placeholder="비밀번호를 한번 더 입력해주세요"
              className="w-64 h-12 px-4 py-2 bg-white rounded-md"
            />
            {error && <p className="text-red-700">{error}</p>}
            <button
              type="submit"
              className="w-64 h-12 bg-main text-white rounded-md"
            >
              회원가입하기
            </button>
          </form>
        </section>
      </section>
    </main>
  );
};

export default SignUp;
