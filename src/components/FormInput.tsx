import { useState } from 'react';
import React from 'react';
import { type UseFormRegisterReturn, useWatch } from 'react-hook-form';
import { placeHolder, hintConfirmed, hintDisabled, hintError, Dirty } from '../styles/typography';
import { isValidPassword } from '../utils/validation';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  label: string; //id인지 pw인지
  error?: boolean; //영문, 숫자 포함 8자 이상 (에러)
  hint?: string; //영문, 숫자 포함 8자 이상 (기본 제공)
  isDirty?: boolean; //입력여부
  isConfirmed?: boolean; //비밀번호 일치 여부
  containerClassName?: string;
}

const FormInput = ({
  register,
  label,
  error,
  hint,
  isDirty,
  isConfirmed,
  type = 'text',
  containerClassName = 'w-full flex flex-col gap-y-[8px]',
  ...rest
}: FormInputProps) => {
  // 상태 정의
  const hasError = (label === 'pw' || label === 'repw') && !!error;
  const isSuccess = (label === 'pw' || label === 'repw') && isDirty && !hasError;
  const isPassword = label === 'pw';
  const isConfirmPassword = label === 'repw' && isConfirmed;
  const isMismatch = (label === 'pw' || label === 'repw') && hasError && isDirty;

  // 상태별 색상 정의
  const baseBorderColor =
    ' border-b border-[#A9ACB2] bg-transparent focus-within:border-[#0F58FF] caret-[#0F58FF]';
  const errorBorderColor = ' border-b border-[#F8645D]';
  const filledBorderColor = ' border-b border-[#0F58FF] caret-[#0F58FF]';

  // 상태별 타이포 정의
  const TypoType = () => {
    if (error || isMismatch) return hintError;
    if (isConfirmPassword || isSuccess) return hintConfirmed;
    return hintDisabled;
  };

  // 최종 상태별 UI 결정
  let currentColor = hasError ? errorBorderColor : `${baseBorderColor}`;
  if (isSuccess) {
    currentColor = `${filledBorderColor}`;
  }

  // 힌트 메시지 스타일
  const messageColor = hasError
    ? 'text-[#F8645D]' // 1. hasError가 true면
    : isSuccess
    ? 'text-[#0F58FF]' // 2. (hasError가 false이고) isSuccess가 true면
    : 'text-[#A9ACB2]'; // 3. 둘 다 아니면  const messageClassName = `text-[12px] pl-[8px] ${messageColor}`;

  const messageClassName = ` pl-[8px] ${messageColor}`;
  const confirmedMessageClassName = ` pl-[8px] text-[#0F58FF]`;

  // 렌더링
  return (
    <div className={containerClassName}>
      <div
        className={`flex h-[48px] pl-[8px] pr-[16px] items-center outline-none   ${currentColor}`}
      >
        <input
          type={type}
          {...register}
          {...rest}
          className={`flex-1 border-none outline-none bg-transparent placeholder:text-[#A9ACB2]`}
          style={isDirty ? Dirty : placeHolder}
        />
        {/* 아이콘 영역 */}
        <div className="w-[16px] h-[16px]">
          {hasError && <img src="/error.svg" alt="error icon" />}
          {isSuccess && <img src="/success.svg" alt="success icon" />}
        </div>
      </div>

      {/* 힌트/에러 메시지 영역 */}
      {isPassword && (
        <div style={TypoType()} className={isMismatch ? 'hidden' : `${messageClassName} `}>
          영문, 숫자 포함 8자 이상
        </div>
      )}
      {isConfirmPassword && (
        <div style={TypoType()} className={confirmedMessageClassName}>
          비밀번호가 일치합니다
        </div>
      )}
      {isMismatch && (
        <div style={TypoType()} className={messageClassName}>
          비밀번호가 일치하지 않습니다
        </div>
      )}
      {label !== 'id' && label !== 'pw' ? (
        <div style={TypoType()} className={messageClassName}>
          {hint}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FormInput;
