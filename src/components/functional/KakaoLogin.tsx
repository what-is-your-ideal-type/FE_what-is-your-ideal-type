import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithCustomToken } from "firebase/auth";

const KakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    console.log("Kakao Auth Code:", code);

    if (code) {
      getFirebaseCustomToken(code); // Firebase Custom Token을 받아오는 함수 호출
    } else {
      console.error("Authorization code is missing.");
      alert("로그인 중 오류가 발생했습니다. 인증 코드가 필요합니다.");
      navigate("/");
    }
  }, [navigate]);

  // 서버에서 Firebase Custom Token을 받아오는 함수
  const getFirebaseCustomToken = async (code: string) => {
    const cloudFunctionUrl =
      process.env.NODE_ENV === "production"
        ? "https://us-central1-ideal-type-8ba18.cloudfunctions.net/exchangeKakaoToken"
        : "http://localhost:5001/ideal-type-8ba18/us-central1/exchangeKakaoToken";
    try {
      console.log("Sending request to server with code:", code); // 요청 전 로그
      const response = await fetch(cloudFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // 카카오 인증 코드 전송
      });

      console.log("Received response status:", response.status); // 응답 상태 로그

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from server:", errorData);
        throw new Error(
          "Failed to fetch Firebase Custom Token: " + errorData.error,
        );
      }

      const data = await response.json();
      console.log("Received data from server:", data);

      if (data.firebaseToken) {
        // Firebase Custom Token으로 로그인
        const userCredential = await signInWithCustomToken(
          auth,
          data.firebaseToken,
        );
        const user = userCredential.user;

        if (user) {
          alert("로그인에 성공했습니다.");
          navigate("/mypage");
        } else {
          console.error("No user information returned from Firebase.");
        }
      } else {
        throw new Error("Failed to retrieve Firebase Custom Token");
      }
    } catch (error) {
      console.error("Error fetching Firebase Custom Token: ", error);
      alert("로그인 중 오류가 발생했습니다." + (error.message || error));
      navigate("/");
    }
  };

  return null;
};

export default KakaoLogin;
