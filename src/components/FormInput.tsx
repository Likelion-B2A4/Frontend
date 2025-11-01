import { useState } from 'react';
import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = ({ label, id, error, ...rest }: FormInputProps) => {
  const defaultClassName =
    'flex text-[16px] w-[320px] h-[48px] pl-[8px] pr-[16px] items-center border-x-transparent border-t-transparent border-b-1 border-gray-400 outline-0  focus:border-b-[#0F58FF] caret-[#0F58FF]';

  return <input className={defaultClassName} {...rest} />;
};

export default FormInput;
