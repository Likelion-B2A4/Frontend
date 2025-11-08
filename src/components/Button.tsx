import React from 'react';
import { defaultButtonText, activateButtonText } from '../styles/typography';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'colored';
  isMobile?: boolean;
}

const Button = ({
  children,
  className = '',
  isMobile = true,
  variant = 'default',
  ...props
}: ButtonProps) => {
  const baseStyles =
    (isMobile ? 'w-[320px]' : 'w-[400px]') +
    ' h-[56px] rounded-[12px] border-0 text-[20px] fontweight-600 cursor-pointer ';

  const stylesByVariant = {
    default: 'bg-[#F4F6F8] text-black',
    colored: 'bg-[#3D84FF] text-[#FFFFFF]',
  };

  const textStyles = {
    default: defaultButtonText,
    colored: activateButtonText,
  };

  const disabledStyles =
    'disabled:bg-[#F4F6F8] disabled:text-[#A9ACB2] disabled:cursor-not-allowed';
  return (
    <button
      className={`${baseStyles} ${stylesByVariant[variant]} ${disabledStyles} ${className} `}
      {...props}
      style={textStyles[variant]}
    >
      {children}
    </button>
  );
};

export default Button;
