import React, { useState } from 'react';
import WeeklyButton from './WeeklyButton';
import FormInput from './FormInput';

interface IOperatingTime {
  mon: string | null;
  tue: string | null;
  wed: string | null;
  thu: string | null;
  fri: string | null;
  sat: string | null;
  sun: string | null;
}

interface Step2FormProps {
  // 1. 최종 저장된 시간 값 (표시용)
  operatingTime: IOperatingTime;
  // 2. 현재 선택된 요일들 (버튼 색상 변경용)
  selectedDays: (keyof IOperatingTime)[];
  // 3. (Req 2) 요일 버튼 클릭/토글 핸들러
  onDayToggle: (dayKey: keyof IOperatingTime) => void;
  // 4. (Req 3) '일괄 시간 적용' 핸들러
  onBatchTimeApply: (time: string) => void;
  // 5. (Req 4) '일괄 휴무 적용' 핸들러
  onBatchDayOffApply: () => void;
}

const weeklist = [
  { key: 'mon', name: '월' },
  { key: 'tue', name: '화' },
  { key: 'wed', name: '수' },
  { key: 'thu', name: '목' },
  { key: 'fri', name: '금' },
  { key: 'sat', name: '토' },
  { key: 'sun', name: '일' },
];

const Step2Form = ({
  operatingTime,
  selectedDays,
  onDayToggle,
  onBatchTimeApply,
  onBatchDayOffApply,
}: Step2FormProps) => {
  const [batchTime, setBatchTime] = useState('');
  const [breakTime, setBreakTime] = useState(false);

  const handleTimeApplyClik = () => {
    if (batchTime.trim() === '') return;
    onBatchTimeApply(batchTime);
    setBatchTime('');
  };

  return (
    <div className="min-h-[290px]">
      <div>운영일 선택</div>
      <div className="flex flex-row gap-x-[2px] mb-[8px] mt-[16px]">
        {weeklist.map((day) => (
          <WeeklyButton
            key={day.key}
            day={day.name}
            isSelected={selectedDays.includes(day.key as keyof IOperatingTime)}
            onDayClick={() => onDayToggle(day.key as keyof IOperatingTime)}
          />
        ))}
      </div>
      <div className="flex flex-row gap-x-[8px] items-center">
        <FormInput label="form" placeholder="진료 시작" />
        <div className="text-[16px]">—</div>
        <FormInput label="form" placeholder="진료 종료" />
      </div>
      <div>
        <div className="flex flex-row justify-start items-center gap-x-[8px] mt-[24px]">
          <div
            onClick={() => {
              setBreakTime(!breakTime);
            }}
          >
            <img
              src={breakTime ? '/check_filled.svg' : '/check_unfilled.svg'}
              className="w-[32px] h-[32px]"
            />
          </div>
          <div className="tect-[16px]">휴게시간</div>
        </div>
        {breakTime && (
          <div className="flex flex-row gap-x-[8px] items-center">
            <FormInput label="form" placeholder="시작" />
            <div className="text-[16px]">—</div>
            <FormInput label="form" placeholder="종료" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2Form;
