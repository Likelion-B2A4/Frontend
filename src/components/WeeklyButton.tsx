import React from 'react';
import { useState } from 'react';

interface WeeklyButtonProps {
  day: string;
  isSelected: boolean;
  onDayClick: (day: string) => void;
}

const WeeklyButton = ({ day, isSelected, onDayClick }: WeeklyButtonProps) => {
  const baseStyles =
    'w-[44px] aspect-square rounded-full  flex items-center justify-center m-[2px] cursor-pointer ';
  const selectedStyles = 'bg-[#3D84FF] text-[#FFFFFF]';
  const unSelectedStyles = 'bg-[#EEEFF2] text-black ';

  const handleClick = () => {
    onDayClick(day);
  };

  return (
    <div>
      <div
        className={`${baseStyles} ${isSelected ? selectedStyles : unSelectedStyles}`}
        onClick={handleClick}
      >
        {day}
      </div>
    </div>
  );
};
export default WeeklyButton;
