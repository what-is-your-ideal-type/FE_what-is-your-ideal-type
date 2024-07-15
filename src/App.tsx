import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, SignUp, Survey, Result } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import Loading from "./components/Loading";

const Generate = lazy(() => import("./pages/Generate"))
const MyPage = lazy(() => import("./pages/MyPage"))

const App = () => {
  return (
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/generate" element={
                <Suspense fallback={<Loading/>}>
                  <Result />
                </Suspense>}/>
              <Route path="/result/:prompts/:url" element={<Result/>} />
              <Route path="/mypage" element={ 
                <Suspense fallback={<Loading/>}>
                  <MyPage />
                </Suspense>} />
            </Routes>
          </Router>
        </AuthProvider>
      )
    }
export default App;
