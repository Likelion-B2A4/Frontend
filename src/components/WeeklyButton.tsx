import { dateButton, dateButtonSelected } from '../styles/typography';

interface WeeklyButtonProps {
  day: string;
  isSelected: boolean;
  onDayClick: (day: string) => void;
  disabled?: boolean;
}

const WeeklyButton = ({ day, isSelected, onDayClick, disabled = false }: WeeklyButtonProps) => {
  const baseStyles =
    'w-[44px] aspect-square rounded-full  flex items-center justify-center m-[2px]';
  const selectedStyles = 'bg-[#3D84FF] ';
  const unSelectedStyles = 'bg-[#EEEFF2] ';

  const handleClick = () => {
    if (disabled) return;
    onDayClick(day);
  };

  return (
    <div>
      <div
        className={`${baseStyles} ${isSelected ? selectedStyles : unSelectedStyles} ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={handleClick}
        style={isSelected ? dateButtonSelected : dateButton}
      >
        {day}
      </div>
    </div>
  );
};
export default WeeklyButton;
