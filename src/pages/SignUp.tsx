import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { isValidPassword } from '../utils/validation';
import { useNavigate } from 'react-router-dom';

type SignUpFormInputs = {
  id: string;
  password: string;
  passwordConfirm: string;
};

const SignUp = () => {
  const nav = useNavigate();

  //폼 관리자 호출
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isValid },
  } = useForm<SignUpFormInputs>({
    mode: 'onChange',
  });

  const passwordValue = watch('password', '');
  const passwordConfirmValue = watch('passwordConfirm', '');

  const isPwConfirmed =
    !!dirtyFields.passwordConfirm &&
    !errors.passwordConfirm &&
    passwordValue === passwordConfirmValue;

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    console.log('폼 데이터:', { id: data.id, password: data.password });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-[132px]">
      <div className="text-[24px]">가입 정보를 입력해주세요</div>

      <form>
        {/* 회원가입 폼 */}
        <div className="flex flex-col gap-y-[24px]">
          <div>
            <div className="text-[16px]">아이디</div>
            <FormInput
              label="id"
              type="text"
              placeholder="아이디를 입력하세요"
              register={register('id', {
                required: '아이디를 입력하세요',
              })}
              error={!!errors.id}
              isDirty={!!dirtyFields.id}
            />
          </div>
          <div>
            <div className="text-[16px]">비밀번호</div>
            <FormInput
              label="pw"
              type="text"
              placeholder="비밀번호를 입력하세요"
              register={register('password', {
                validate: (value) => isValidPassword(value) || '영문, 숫자 포함 8자 이상',
              })}
              error={!!errors.password}
              isDirty={!!dirtyFields.password}
            />
          </div>
          <div>
            <FormInput
              label="repw"
              type="text"
              placeholder="비밀번호를 재입력하세요"
              register={register('passwordConfirm', {
                validate: (value) => value === passwordValue || '비밀번호가 일치하지 않습니다.',
              })}
              error={!!errors.passwordConfirm}
              isDirty={!!dirtyFields.passwordConfirm}
              isConfirmed={isPwConfirmed}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-[320px] h-[48px] mt-[60px]"
          disabled={!isValid || !isPwConfirmed}
          onClick={handleSubmit(onSubmit) && (() => nav('/signuphosp'))}
        >
          확인
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
