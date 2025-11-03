import React, { useState } from 'react';
import WeeklyButton from './WeeklyButton';

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

  const handleTimeApplyClik = () => {
    if (batchTime.trim() === '') return;
    onBatchTimeApply(batchTime);
    setBatchTime('');
  };

  return (
    <div>
      <div>운영일 선택</div>
      <div className="flex flex-row justify-center gap-x-[2px]">
        {weeklist.map((day) => (
          <WeeklyButton
            key={day.key}
            day={day.name}
            isSelected={selectedDays.includes(day.key as keyof IOperatingTime)}
            onDayClick={() => onDayToggle(day.key as keyof IOperatingTime)}
          />
        ))}
      </div>
    </div>
  );
};

export default Step2Form;
