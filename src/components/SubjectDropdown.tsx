import { useState, useRef, useEffect } from 'react';
import { Dirty, placeHolder } from '../styles/typography';

interface SubjectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isDirty?: boolean;
  style: React.CSSProperties;
}

const SubjectDropdown = ({
  value,
  onChange,
  placeholder = '진료 과목을 선택하세요',
  isDirty,
  style,
}: SubjectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const subjects = [
    '내과·가정의학과',
    '외과·정형외과',
    '이비인후과',
    '안과',
    '피부과',
    '산부인과',
    '소아청소년과',
    '정신건강의학과',
    '치과',
    '한의원',
    '기타',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (subject: string) => {
    onChange(subject);
    setIsOpen(false);
  };

  const baseBorderColor = ' border-b border-[#A9ACB2] bg-transparent focus-within:border-[#0F58FF]';
  const filledBorderColor = ' border-b border-[#0F58FF]';

  const currentColor = isDirty ? filledBorderColor : baseBorderColor;

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <div
        className={`flex h-[48px] px-[8px] items-center outline-none cursor-pointer ${currentColor}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1" style={style}>
          {value || placeholder}
        </div>
        <div className="w-[16px] h-[16px] flex items-center justify-center">
          <span className={` transition-transform ${isOpen ? 'rotate-180' : ''}`}>^</span>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full z-50 bg-white border border-[#E2E4E8] rounded-[8px] shadow-lg min-h-[440px] overflow-y-auto ">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="px-[16px] py-[8px] h-full cursor-pointer hover:bg-[#F4F6F8] transition-colors "
              onClick={() => handleSelect(subject)}
              style={Dirty}
            >
              {subject}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectDropdown;
