import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
declare global {
  interface Window {
    Kakao: any;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

// if (window.Kakao && !window.Kakao.isInitialized()) {
//   window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
//   console.log("Kakao SDK initialized");
// }

root.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
);

reportWebVitals();
