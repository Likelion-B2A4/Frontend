import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';

const Intro = () => {
  const isMobile = useIsMobile();
  // console.log('isMobile:', isMobile);
  const nav = useNavigate();

  return (
    <>
      {isMobile ? (
        <div className="flex h-screen flex-col justify-center content-center items-center">
          <div className="flex flex-row items-center p-[48px]">
            <div className="flex flex-col items-center">
              <img src="/mobile_activate.svg" alt="disabled logo" />
              <div className="text-[#0C58FF]">농인</div>
            </div>
            <div className="flex flex-col items-center">
              <img src="/web_disabled.svg" alt="active logo" />
              <div className="text-[#A9ACB2]">의사</div>
            </div>
          </div>
          <div>모바일은 농인용이에요</div>
          <div>의사는 태블릿/웹을 사용해주세요</div>
        </div>
      ) : (
        <div className="flex h-screen flex-col justify-center content-center items-center">
          <div className="flex flex-row items-center p-[48px]">
            <div className="flex flex-col items-center">
              <img src="/mobile_disabled.svg" alt="disabled logo" />
              <div className="text-[#A9ACB2]">농인</div>
            </div>
            <div className="flex flex-col items-center">
              <img src="/web_activate.svg" alt="active logo" />
              <div className="text-[#0C58FF]">의사</div>
            </div>
          </div>
          <div>태블릿/웹은 의사용이에요</div>
          <div>농인은 모바일을 사용해주세요</div>
        </div>
      )}
      nav('/login');
    </>
  );
};
export default Intro;
