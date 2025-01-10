import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Survey, Result, GenderSelect } from "./pages";
import { AuthProvider } from "./contexts/auth-context";
import Loading from "./components/ui/loading";
import ErrorBoundary from "./components/functional/error-boudary";

const Generate = lazy(() => import("./pages/generate"));
const MyPage = lazy(() => import("./pages/mypage"));
const SignUp = lazy(() => import("./pages/signup"));

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      {/* TODO fallback UI 필요 */}
      <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
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
      </ErrorBoundary>
    </AuthProvider>
    </QueryClientProvider>
  );
};
export default App;
