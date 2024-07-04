import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignUp, Survey, Result, MyPage } from "./pages";
//import { auth } from "./firebase";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  // 초기 인증 상태가 해결되는 즉시 해결되는 프로미스를 반환
  // Firebase가 쿠키와 토큰을 읽고 백엔드와 소통하여 로그인 여부를 확인하는 동안 기다리는 Promise
  // 프로미스가 해결되면 현재 사용자는 유효한 사용자이거나 사용자가 로그아웃한 경우 null일 수 있다.
  // const init = async () => {
  //   // 앱이 시작될 때 Firebase의 초기 인증 상태를 기다리고,
  //   // 해당 상태가 resolve된 후에 앱을 렌더링하기 위해서 authStateReady() 사용함
  //   await auth.authStateReady();
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   init();
  // }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <img src="/images/spin.gif" alt="loading" width="10%" />
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/question" element={<Question />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/result" element={<Result />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
