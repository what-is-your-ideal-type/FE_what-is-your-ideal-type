import React from "react";
import spin from "../assets/images/spin.gif";

export default function Loading() {
  return (
    <div>
      <img src={spin} alt="loading" width="10%" />
      <h2>이상형을 찾고 있어요!</h2>
      <h3>잠시만 기다려주세요.</h3>
    </div>
  );
}
