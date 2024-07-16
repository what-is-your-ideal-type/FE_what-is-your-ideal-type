import { useEffect } from "react";
// kakao 기능 동작을 위해 넣어준다.
// const { Kakao } = window;

export default () => {
  //   // 배포한 자신의 사이트
  //   const realUrl = "https://what-is-your-ideal-type.vercel.app";
  //   const resultUrl = window.location.href;

  //   useEffect(() => {
  //     Kakao.cleanup();
  //     // 자신의 js 키를 넣어준다.
  //     Kakao.init("c0000000000");
  //     // 잘 적용되면 true 를 뱉는다.
  //     console.log(Kakao.isInitialized());
  //   }, []);

  //   const shareKakao = () => {
  //     Kakao.Share.sendDefault({
  //       objectType: "feed",
  //       content: {
  //         title: "AI 이상형 찾기",
  //         description: "AI가 그려준 내 이상형은 어떻게 생겼을까?",
  //         imageUrl: "",
  //         link: {
  //           mobileWebUrl: realUrl,
  //         },
  //       },
  //       buttons: [
  //         {
  //           title: "나도 이상형 찾으러 가기",
  //           link: {
  //             mobileWebUrl: realUrl,
  //           },
  //         },
  //       ],
  //     });
  //   };

  return (
    <>
      <button
      // className="grey-btn"
      // onClick={() => {
      //   shareKakao();
      // }}
      >
        {" "}
        카카오톡 공유하기{" "}
      </button>
    </>
  );
};
