import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'colored';
}

const Button = ({ children, className = '', variant = 'default', ...props }: ButtonProps) => {
  const baseStyles = 'w-[320px] h-[56px] rounded-[12px] border-0 text-[20px] fontweight-600 ';

  const stylesByVariant = {
    default: 'bg-[#F4F6F8] text-black',
    colored: 'bg-[#3D84FF] text-[#FFFFFF]',
  };

  const disabledStyles =
    'disabled:bg-[#F4F6F8] disabled:text-[#A9ACB2] disabled:cursor-not-allowed';
  return (
    <button
      className={`${baseStyles} ${stylesByVariant[variant]} ${disabledStyles} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
