<<<<<<< HEAD
import React from "react";
import Button from "../components/Button";
import { mainButtonArgs, authButtonArgs } from "../components/ButtonArgs";
import Input from "../components/Input";
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth, db, USERS_COLLECTION } from "../firebase";
import { doc, setDoc, query, where, getDocs } from "firebase/firestore";
>>>>>>> e61004f9548cdf9f5c331262db649e1e21304cfd

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

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
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
    <main className="flex items-center justify-center min-h-screen bg-bg p-4">
      <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-16">
        <section className="flex flex-col items-center space-y-8">
          <div className="flex items-center justify-center w-48 h-48 bg-white rounded-full">
            <span className="text-2xl font-bold">Logo</span>
          </div>
<<<<<<< HEAD
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
=======
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
>>>>>>> e61004f9548cdf9f5c331262db649e1e21304cfd
        </section>
      </section>
    </main>
  );
};

export default SignUp;
