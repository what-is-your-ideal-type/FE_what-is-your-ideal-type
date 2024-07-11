import React from "react";

export const Loading = () => {
  const loading = process.env.PUBLIC_URL + "/images/spin.gif";

  return (
    <div className="flex flex-col items-center">
      <img src="/images/spin.gif" alt="loading" className="w-20 h-20" />
      <p className="text-base font-bold mt-2">이상형을 찾고 있어요!</p>
      <p className="text-sm mt-2">잠시만 기다려주세요.</p>
    </div>
  );
};

export default Loading;
