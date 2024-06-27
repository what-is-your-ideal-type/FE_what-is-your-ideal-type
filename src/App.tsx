import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Question from "./pages/Survey";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Result from "./pages/Result";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/question" element={<Question />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/result" element={<Result />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
