import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Survey, Result, GenderSelect } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";
import Loading from "./components/ui/Loading";

const Generate = lazy(() => import("./pages/Generate"));
const MyPage = lazy(() => import("./pages/MyPage"));
const SignUp = lazy(() => import("./pages/SignUp"));

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Loading progressState={0} />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/genderselect" element={<GenderSelect />} />
          <Route
            path="/generate"
            element={
              <Suspense fallback={<Loading progressState={0} />}>
                <Generate />
              </Suspense>
            }
          />
          <Route path="/result/:postId" element={<Result />} />
          <Route
            path="/mypage"
            element={
              <Suspense fallback={<Loading progressState={0} />}>
                <MyPage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
    </QueryClientProvider>
  );
};
export default App;
