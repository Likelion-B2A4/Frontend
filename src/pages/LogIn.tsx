import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Button from '../components/Button';
import { isValidPassword } from '../utils/validation';
import FormInput from '../components/FormInput';
import { useIsMobile } from '../hooks/useIsMobile';

type LoginFormInputs = {
  id: string;
  password: string;
};

const LogIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isValid },
  } = useForm<LoginFormInputs>({
    mode: 'onChange',
  });

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const isMobile = useIsMobile();
  const isFormInvalid = id === '' || !isValidPassword(password);

  const handleSinup = () => {
    nav('/signup');
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // e.preventDefault()는 rhfHandleSubmit이 자동으로 해줍니다.

    console.log('아이디:', data.id); // 'id' 대신 'data.id'
    console.log('비밀번호:', data.password); // 'password' 대신 'data.password'

    const payload = {
      id: data.id,
      password: data.password,
      deviceType: isMobile ? 'mobile' : 'desktop',
    };

    console.log('전송할 데이터:', payload); // try { ... API 호출 ... }

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
    <div className="flex w-screen h-screen flex-col justify-around items-center p-[16px]">
      <div className="mb-[60px] mt-[160px]">
        <img src="../src/assets/typologo.svg" className="w-[88px]" />
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between ">
        <div className="w-full gap-y-[16px] flex flex-col py-0">
          <FormInput
            label="id"
            type="text"
            placeholder="아이디를 입력하세요"
            register={register('id')}
            isDirty={!!dirtyFields.id}
            error={!errors}
          />
          <FormInput
            label="pw"
            type="text"
            placeholder="비밀번호를 입력하세요"
            register={register('password', { validate: (value) => isValidPassword(value) })}
            isDirty={!!dirtyFields.password}
            error={!!errors.password}
          />
        </div>

        {/* button */}

        <div className="static bottom-0">
          <div className="w-full gap-[10px] flex flex-col mt-[40px] py-[12px]">
            <Button type="button" children="회원가입" onClick={handleSinup} />
            <Button type="submit" disabled={!isValid} variant="colored" children="로그인" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
