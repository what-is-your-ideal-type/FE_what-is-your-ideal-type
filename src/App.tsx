import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import SignUp from "./Pages/SignUp";
import Main from "./Pages/Main";
import Question from "./Pages/Question";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/question" element={<Question />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
