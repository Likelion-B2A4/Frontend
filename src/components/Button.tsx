import React from 'react';
import {
  defaultButtonText,
  activateButtonText,
  disabledButtonText,
  defaultMiniButtonText,
  activateMiniButtonText,
  disabledMiniButtonText,
} from '../styles/typography';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'colored';
  isMobile?: boolean;
  size?: 'default' | 'mini';
}

const Button = ({
  children,
  className = '',
  isMobile = true,
  variant = 'default',
  size = 'default',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    (isMobile ? 'w-[320px]' : 'w-[400px]') +
    ' h-[56px] rounded-[12px] border-0 text-[20px] fontweight-600 cursor-pointer ';

  const stylesByVariant = {
    default: 'bg-[#F4F6F8] ',
    colored: 'bg-[#3D84FF] ',
  };

  const textStyles = {
    default: defaultButtonText,
    colored: activateButtonText,
  };

  const disabledStyles = 'disabled:bg-[#F4F6F8] disabled:cursor-not-allowed';

  const miniBasedStyles =
    'w-[96px] h-[40px] py-[8px] px-[18px] rounded-[12px] border-0 cursor-pointer';
  const miniTextStyles = {
    default: defaultMiniButtonText,
    colored: activateMiniButtonText,
  };

  const buttonStyles = {
    default: (
      <button
        className={`${baseStyles} ${stylesByVariant[variant]} ${disabledStyles} ${className} `}
        {...props}
        disabled={disabled}
        style={disabled ? disabledButtonText : textStyles[variant]}
      >
        {children}
      </button>
    ),
    mini: (
      <button
        className={`${miniBasedStyles} ${stylesByVariant[variant]} ${disabledStyles} ${className} `}
        {...props}
        disabled={disabled}
        style={disabled ? disabledMiniButtonText : miniTextStyles[variant]}
      >
        {children}
      </button>
    ),
  };

  return <> {buttonStyles[size]}</>;
};

export default Button;
