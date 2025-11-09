import React from 'react';

interface ToggleSwitchProps extends React.IframeHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const ToggleSwitch = ({ id, checked, onChange, ...rest }: ToggleSwitchProps) => {
  return (
    <div>
      <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          id={id}
          className="sr-only peer"
          checked={checked}
          onChange={onChange}
          {...rest}
        />
        <div className="w-[40px] h-[24px] bg-[#E2E4E8] relative rounded-full peer-checked:bg-[#3D84FF]"></div>
        <div className="absolute top-[2px] left-[2px] w-[20px] h-[20px] bg-white rounded-full transition-transform peer-checked:translate-x-[16px] shadow-[0_0_4px_0_rgba(0,0,0,0.10)]"></div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
