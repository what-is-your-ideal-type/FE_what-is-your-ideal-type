import React from "react";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { mainButtonArgs } from "../components/ButtonArgs";

const MyPage = () => {
  return (
    <main className="flex flex-col items-center space-y-8 bg-bg py-16">
      <h1 className="text-3xl font-bold">Josh님의 이상형 리스트 입니다.</h1>
      <Button label="새로운 이상형 찾기" {...mainButtonArgs} />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="w-[250px]">
              <div className="p-4">
                <img
                  src="/images/image 13.png"
                  alt="차은우"
                  className="w-full h-auto"
                />
                <div className="mt-4 space-y-1 text-center">
                  <p>#차가운 #만찢남/여</p>
                  <p>#20대 #오독한 코</p>
                  <p>#하얀 피부 #키 180이상</p>
                </div>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
};

export default MyPage;
