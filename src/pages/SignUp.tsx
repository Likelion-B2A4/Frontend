import React from 'react';

const SignUp = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-[132px]">
      <div className="text-[24px]">가입 정보를 입력해주세요</div>

      <form>
        <div className="text-[16px]">아이디</div>
        <input type="text" placeholder="아이디를 입력하세요" />

        <div className="text-[16px]">비밀번호</div>
        <input type="password" placeholder="비밀번호를 입력하세요" />
      </form>
    </div>
  );
};

export default SignUp;
