import { useNavigate } from 'react-router-dom';

const PreQuestion2 = () => {
  const navigate = useNavigate();

  const options = [
    { text: '오늘', gif: '2-1' },
    { text: '며칠 전', gif: '2-2' },
    { text: '오래 전', gif: '2-3' },
  ];

  const handleOptionClick = () => {
    navigate('/pre-question3');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-[120px] px-5">
      <h1 className="text-center text-[32px] font-semibold leading-[150%] tracking-[-0.64px] text-[#1A1A1A]">
        언제부터 불편하셨나요?
      </h1>
      <p className="mt-4 text-center text-[24px] font-semibold leading-[150%] tracking-[-0.48px] text-[#666B76]">
        수어 이미지를 보고 골라주세요
      </p>

      <div className="mt-[100px] flex justify-center gap-6">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={handleOptionClick}
          >
            <img
              src={`/src/assets/prequestion/${option.gif}.GIF`}
              alt={`${option.text} 수어 이미지`}
              className="w-[296px] h-[296px] rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200"
            />
            <p className="mt-6 text-center text-[32px] font-semibold leading-[150%] tracking-[-0.64px] text-[#666B76]">
              {option.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreQuestion2;
