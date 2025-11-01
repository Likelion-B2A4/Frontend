import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { isValidPassword } from '../utils/validation';

const LogIn = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const isFormInvalid = id === '' || !isValidPassword(password);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('아이디:', id);
    console.log('비밀번호:', password);

    nav('/main');
  };

  return (
    <div className="flex h-screen flex-col justify-center items-center p-[16px]">
      <div className="mb-[60px]">
        <img src={'/sonbit.svg'} alt="손빛 로고" className="w-[100px] h-[100px]" />
        <div className="text-alice text-2xl text-transparent flex justify-center bg-clip-text bg-gradient-to-br from-[#0F58FF] to-[#3FB6FF]">
          손빛
        </div>
      </div>
      <div className="gap-y-[16px] flex flex-col py-0">
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          onChange={(e) => setId(e.target.value)}
          value={id}
          className="flex text-[16px] w-[320px] h-[48px] pl-[8px] pr-[16px] items-center border-x-transparent border-t-transparent border-b-1 border-gray-400 outline-0  focus:border-b-[#0F58FF] caret-[#0F58FF]"
        />
        <input
          type="text"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex text-[16px] w-[320px] h-[48px] pl-[8px] pr-[16px] items-center border-x-transparent border-t-transparent border-b-1 border-gray-400 outline-0  focus:border-b-[#0F58FF] caret-[#0F58FF]"
        />
        <div
          className={
            'text-[12px] pl-[8px] ' + (isFormInvalid ? ' text-[#A9ACB2]' : ' text-[#FFFFFF]')
          }
        >
          영문, 숫자 포함 8자 이상
        </div>
      </div>
      <div className="gap-[10px] flex flex-col mt-[40px] py-[12px]">
        <Button children="회원가입" />
        <Button disabled={isFormInvalid} variant="colored" children="로그인" />
      </div>
    </div>
  );
};

export default LogIn;
