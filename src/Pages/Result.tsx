import React from "react";

export default function Result() {
  return (
    <div className="flex">
      <div>
        <h4 className="gray-dark">당신의 이상형은:</h4>
        <h2>생성된 타이틀</h2>
        <div>생성된 이미지</div>
      </div>
      <div>
        <h3>
          당신의 이상형은 짧은 머리, 쌍커풀, 오똑한 코, 작은 입, 까만색 피부를
          가진 기운 넘치는 E_F_ 20대 남성입니다.
        </h3>
        <p>사진을 저장하고 기록하고 싶다면 로그인 해보세요</p>
        <div>로그인 버튼</div>
        <div>사진저장버튼, 공유버튼</div>
      </div>
    </div>
  );
}
