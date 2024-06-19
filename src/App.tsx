import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./Components/Loading";
import SignUp from "./Pages/SignUp";
import Main from "./Pages/Main";
import Question from "./Pages/Question";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/question" element={<Question />} />
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;
