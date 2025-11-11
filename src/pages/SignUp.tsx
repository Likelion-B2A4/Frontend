import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { isValidPassword, isNameValid } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';
import { defaultButtonText, Dirty } from '../styles/typography';
import Topbar from '../layouts/Topbar';

type SignUpFormInputs = {
  id: string;
  password: string;
  passwordConfirm: string;
  name: string;
};

const SignUp = () => {
  const nav = useNavigate();
  const isMobile = useIsMobile();

  //폼 관리자 호출
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, dirtyFields, isValid, isDirty },
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
    const payload = {
      id: data.id,
      password: data.password,
      deviceType: isMobile ? 'mobile' : 'desktop',
      name: data.name,
    };

    console.log('API로 전송할 최종 데이터:', payload);

    // try {
    //   // api 호출 추가...
    //   console.log('회원가입 성공!');

    //   if (isMobile) {
    //     nav('/map');
    //   } else {
    //     nav('/signuphosp');
    //   }
    // } catch (error) {
    //   console.error('회원가입 실패:', error);
    //   alert('회원가입에 실패했습니다.');
    // }
  };

  const handleNextPage = () => {
    if (isMobile) {
      nav('/service', { state: { fromSignup: true } });
    } else {
      nav('/signuphosp');
    }
  };

  return (
    <div className="h-screen flex flex-col px-[20px] ">
      <div>
        <Topbar title="회원가입" type="header" />
      </div>
      <div className="flex flex-col justify-start">
        <div style={defaultButtonText} className="text-[24px] justify-items-start my-[40px] ">
          가입 정보를 입력해주세요
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-col justify-center items-center">
          {/* 회원가입 폼 */}
          <div className="flex flex-col justify-center gap-y-[8px]">
            <div>
              <div style={Dirty} className="text-[16px]">
                아이디
              </div>
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
              <div style={Dirty} className="text-[16px]">
                비밀번호
              </div>
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

          {isMobile && (
            <div>
              <div style={Dirty} className="mt-[24px]">
                이름
              </div>
              <FormInput
                label="name"
                placeholder="이름을 입력하세요"
                register={register('name', {
                  validate: (name) => isNameValid(name),
                })}
                isDirty={!!dirtyFields.name}
              />
            </div>
          )}

          <div className="flex h-[48px] items-center justify-center px-[20px]">
            <Button
              type="submit"
              className="fixed bottom-4"
              disabled={!isValid || !isPwConfirmed}
              onClick={handleNextPage}
              variant={!isValid ? 'default' : 'colored'}
            >
              확인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
