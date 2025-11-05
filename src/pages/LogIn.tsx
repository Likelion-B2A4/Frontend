import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { isValidPassword } from '../utils/validation';
import FormInput from '../components/FormInput';
import { useIsMobile } from '../hooks/useIsMobile';

const LogIn = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const isMobile = useIsMobile();
  const isFormInvalid = id === '' || !isValidPassword(password);

  const handleSinup = () => {
    nav('/signup');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('아이디:', id);
    console.log('비밀번호:', password);

    const payload = {
      id: id,
      password: password,
      deviceType: isMobile ? 'mobile' : 'desktop',
    };

    // try {
    //   // API 엔드포인트는 하나만 있어도 됩니다.
    //   await axios.post('https://api.example.com/auth/login', payload);
    //   alert('로그인 성공!');

    //   // 백엔드 로그 확인: { email: '...', password: '...', deviceType: 'mobile' }
    //   console.log('전송한 데이터:', payload);

    // } catch (error) {
    //   alert('로그인 실패');
    // }
  };

  return (
    <div className="flex  h-screen flex-col justify-center items-center p-[16px]">
      <div className="mb-[60px]">
        <img src={'/sonbit.svg'} alt="손빛 로고" className="w-[100px] h-[100px]" />
        <div className="text-alice text-2xl text-transparent flex justify-center bg-clip-text bg-linear-to-br from-[#0F58FF] to-[#3FB6FF]">
          손빛
        </div>
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-[16px]">
        <div className="gap-y-[16px] flex flex-col py-0">
          <FormInput
            label="아이디"
            type="text"
            placeholder="아이디를 입력하세요"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
          <FormInput
            label="비밀번호"
            type="text"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="pl-[8px] h-4">
            {isFormInvalid && (
              <div className="text-[12px] text-[#A9ACB2]">영문, 숫자 포함 8자 이상</div>
            )}
          </div>{' '}
        </div>

        {/* button */}
        <div className="gap-[10px] flex flex-col mt-[40px] py-[12px]">
          <Button type="button" children="회원가입" onClick={handleSinup} />
          <Button type="submit" disabled={isFormInvalid} variant="colored" children="로그인" />
        </div>
      </form>
    </div>
  );
};

export default LogIn;
