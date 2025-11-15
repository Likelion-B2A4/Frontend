import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PreQuestion3 = () => {
  const nav = useNavigate();

  useEffect(() => {
    const timeId = setTimeout(() => {
      nav('/patientchat');
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [nav]);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="pt-[300px] flex flex-col items-center">
        <img
          src="/web_activate.svg"
          alt="web activate icon"
          className="w-20 h-20"
        />
        <h1 className="mt-6 text-center text-[32px] font-semibold leading-[150%] tracking-[-0.64px] text-[#1A1A1A]">
          손빛이 진료를 시작할게요
        </h1>
        <p className="mt-4 text-center text-[24px] font-semibold leading-[150%] tracking-[-0.48px] text-[#666B76]">
          의사와 대화를 시작해보세요
        </p>
      </div>
    </div>
  );
};

export default PreQuestion3;
