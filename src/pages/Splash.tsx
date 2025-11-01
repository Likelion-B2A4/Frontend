import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SplashPageWeb = () => {
  const navigate = useNavigate();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    const navigateTimer = setTimeout(() => {
      navigate('/logointro', { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
    return () => clearTimeout(navigateTimer);
  }, [navigate]);

  return (
    <div
      className={`flex h-screen flex-col justify-center items-center p-[16px] transition-opacity duration-500 ease-out 
                  ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <img src={'/sonbit.svg'} alt="손빛 로고" className="splash-logo" />
      <div className="text-2xl text-transparent font-alice bg-clip-text bg-gradient-to-br from-[#0F58FF] to-[#3FB6FF]">
        손빛
      </div>
    </div>
  );
};

export default SplashPageWeb;
