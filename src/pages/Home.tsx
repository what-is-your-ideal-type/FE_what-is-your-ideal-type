import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, USERS_COLLECTION } from "../firebase";
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
import NavigateToSurvey from "../components/NavigateToSurvey";
import {
  loginWithGoogle,
  handleRedirectResult,
} from "../services/auth/loginWithGoogle";
import { loginWithEmail } from "../services/auth/loginWithEmail";
import { logout } from "../services/auth/logoutService";
import { doc, setDoc, getDocs, where, query } from "firebase/firestore";
import { User } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const credential = await handleRedirectResult();
        if (credential?.accessToken) {
          console.log("User logged in: ", credential);
          navigate("/mypage");
        }
      } catch (error) {
        console.log("fetchRedirectResult error:", error);
      }
    };
    fetchRedirectResult();
  }, []);

  useEffect(() => {
    if (currentUser) {
      saveGoogleUserToFirestore(currentUser);
    }
  }, [currentUser]);

  const saveGoogleUserToFirestore = async (currentUser: User) => {
    const q = query(USERS_COLLECTION, where("email", "==", currentUser.email));
    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await setDoc(doc(db, "users", currentUser.uid), {
          uid: currentUser.uid,
          email: currentUser.email,
        });
        console.log("Google user data successfully saved to Firestore.");
      } else {
        console.log("Google user already exists in Firestore.");
      }
    } catch (error) {
      console.error("Error saveGoogleUserToFirestore: ", error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      console.log("loginWithGoogle");
    } catch (error) {
      console.error("Error handleLoginWithGoogle: ", error);
    }
  };

  const handleLoginWithEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await loginWithEmail(email, password);
      alert("로그인에 성공했습니다.");
      navigate("/mypage");
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

  const handleLogout = async () => {
    await logout()
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Failed to signOut", error);
      });
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-bg p-4">
      <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-16">
        <section className="flex flex-col items-center space-y-8">
          <div className="flex items-center justify-center w-48 h-48 bg-white rounded-full">
            <span className="text-2xl font-bold">Logo</span>
          </div>
          {currentUser ? (
            <>
              <Button
                label="마이페이지"
                type="button"
                {...mainButtonArgs}
                onClick={() => navigate("/mypage")}
              />
              <Button
                label="로그아웃"
                type="button"
                {...mainButtonArgs}
                onClick={() => handleLogout()}
              />
            </>
          ) : (
            <NavigateToSurvey label="로그인 없이 시작" />
          )}
        </section>
        {!currentUser && (
          <section className="flex flex-col items-center p-8 space-y-4 bg-[#e9e7e2] rounded-lg">
            <section>
              <form
                onSubmit={handleLoginWithEmail}
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
              <Button
                label="구글"
                type="button"
                {...googleButtonArgs}
                onClick={handleLoginWithGoogle}
              />
            </section>
          </section>
        )}
      </section>
    </main>
  );
};

export default Home;
