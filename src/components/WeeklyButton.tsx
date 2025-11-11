import { dateButton, dateButtonSelected } from '../styles/typography';

interface WeeklyButtonProps {
  day: string;
  isSelected: boolean;
  onDayClick: (day: string) => void;
}

const WeeklyButton = ({ day, isSelected, onDayClick }: WeeklyButtonProps) => {
  const baseStyles =
    'w-[44px] aspect-square rounded-full  flex items-center justify-center m-[2px] cursor-pointer ';
  const selectedStyles = 'bg-[#3D84FF] ';
  const unSelectedStyles = 'bg-[#EEEFF2] ';

  const handleClick = () => {
    onDayClick(day);
  };

  return (
    <div>
      <div
        className={`${baseStyles} ${isSelected ? selectedStyles : unSelectedStyles}`}
        onClick={handleClick}
        style={isSelected ? dateButtonSelected : dateButton}
      >
        {day}
      </div>
    </div>
  );
};
export default WeeklyButton;
