import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignUp, Survey, Result, MyPage } from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/question" element={<Question />} /> */}
          <Route path="/home" element={<Home />}/>
          <Route path="/survey" element={<Survey />} />
          <Route path="/result" element={<Result />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
