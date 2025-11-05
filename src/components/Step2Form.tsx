import React, { useState } from 'react';
import WeeklyButton from './WeeklyButton';
import FormInput from './FormInput';
import { set } from 'date-fns';
import { startOfHour } from 'date-fns/fp';

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

  startHour: string;
  setStartHour: (val: string) => void;
  startMinute: string;
  setStartMinute: (val: string) => void;
  endHour: string;
  setEndHour: (val: string) => void;
  endMinute: string;
  setEndMinute: (val: string) => void;
  breakTime: boolean;
  setBreakTime: (val: boolean) => void;
  breakHourStart: string;
  setBreakHourStart: (val: string) => void;
  breakMinuteStart: string;
  setBreakMinuteStart: (val: string) => void;
  breakHourEnd: string;
  setBreakHourEnd: (val: string) => void;
  breakMinuteEnd: string;
  setBreakMinuteEnd: (val: string) => void;
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

  startHour,
  setStartHour,
  startMinute,
  setStartMinute,
  endHour,
  setEndHour,
  endMinute,
  setEndMinute,
  breakTime,
  setBreakTime,
  breakHourStart,
  setBreakHourStart,
  breakMinuteStart,
  setBreakMinuteStart,
  breakHourEnd,
  setBreakHourEnd,
  breakMinuteEnd,
  setBreakMinuteEnd,
}: Step2FormProps) => {
  //   const [batchTime, setBatchTime] = useState('');
  //   const [breakTime, setBreakTime] = useState(false);
  const [dayOff, setDayOff] = useState(false);

  //   const [startHour, setStartHour] = useState('');
  //   const [startMinute, setStartMinute] = useState('');
  //   const [endHour, setEndHour] = useState('');
  //   const [endMinute, setEndMinute] = useState('');

  //   const [breakHourStart, setBreakHourStart] = useState('');
  //   const [breakMinuteStart, setBreakMinuteStart] = useState('');
  //   const [breakHourEnd, setBreakHourEnd] = useState('');
  //   const [breakMinuteEnd, setBreakMinuteEnd] = useState('');

  //   const handleTimeApplyClik = () => {
  //     if (!startHour || !startMinute || !endHour || !endMinute) {
  //       alert('진료 시간을 모두 입력해주세요');
  //       return;
  //     }

  //     let combinedTime = `${startHour} : ${startMinute} ~ ${endHour} : ${endMinute}`;
  //     if (breakTime && breakHourStart && breakHourEnd && breakMinuteStart && breakMinuteEnd) {
  //       combinedTime += ` 휴게: ${breakHourStart} : ${breakMinuteStart} ~ ${breakHourEnd} : ${breakMinuteEnd}`;
  //     }

  //     onBatchTimeApply(combinedTime);

  //     setStartHour('');
  //     setStartMinute('');
  //     setEndHour('');
  //     setEndMinute('');
  //     setBreakHourStart('');
  //     setBreakMinuteStart('');
  //     setBreakHourEnd('');
  //     setBreakMinuteEnd('');
  //   };

  const handleDayOffToggle = () => {
    const newDayOffState = !dayOff;
    setDayOff(newDayOffState);

    if (newDayOffState) {
      onBatchDayOffApply();
    }
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
      <div className="flex flex-row gap-x-[50px]">
        {/* 진료시간 선택 */}
        <div className="flex flex-row gap-x-[4px] items-center mb-[24px]">
          <div className="flex flex-col gap-y-[4px] items-center">
            <div className="flex flex-row gap-x-[8px] px-[8px] items-center">
              <FormInput
                label="form"
                placeholder=""
                containerClassName="w-[56px]"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
              />
              <div className="text-[16px]">:</div>
              <FormInput
                label="form"
                placeholder=""
                containerClassName="w-[56px]"
                value={startMinute}
                onChange={(e) => setStartMinute(e.target.value)}
              />
            </div>
            <div className="text-[12px] text-[#666B76]">진료 시작 시간</div>
          </div>
          <div>—</div>
          <div className="flex flex-col gap-y-[4px]  items-center">
            <div className="flex flex-row gap-x-[8px] px-[8px] items-center">
              <FormInput
                label="form"
                placeholder=""
                containerClassName="w-[56px]"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
              />
              <div className="text-[16px]">:</div>
              <FormInput
                label="form"
                placeholder=""
                containerClassName="w-[56px]"
                value={endMinute}
                onChange={(e) => setEndMinute(e.target.value)}
              />
            </div>
            <div className="text-[12px] text-[#666B76]">진료 종료 시간</div>
          </div>
        </div>
        <div>
          <div onClick={handleDayOffToggle} className="flex flex-row gap-x-[8px] items-center">
            <img
              src={dayOff ? '/check_filled.svg' : '/check_unfilled.svg'}
              className="w-[32px] h-[32px] "
            />
            <div className="text-[16px]">휴무</div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-row justify-start items-center gap-x-[8px] mt-[24px]">
          <div
            onClick={() => {
              setBreakTime(!breakTime);
            }}
            className="flex flex-row gap-x-[8px] items-center"
          >
            <img
              src={breakTime ? '/check_filled.svg' : '/check_unfilled.svg'}
              className="w-[32px] h-[32px] "
            />
          </div>
          <div className="tect-[16px] mb-0">휴게시간</div>
        </div>
        {breakTime && (
          <div className="flex flex-row gap-x-[4px] items-center">
            <div className="flex flex-col gap-y-[8px] items-center">
              <div className="flex flex-row gap-x-[8px] px-[8px] items-center">
                <FormInput
                  label="form"
                  placeholder=""
                  containerClassName="w-[56px]"
                  value={breakHourStart}
                  onChange={(e) => setBreakHourStart(e.target.value)}
                />
                <div className="text-[16px]">:</div>
                <FormInput
                  label="form"
                  placeholder=""
                  containerClassName="w-[56px]"
                  value={breakMinuteStart}
                  onChange={(e) => setBreakMinuteStart(e.target.value)}
                />
              </div>
              <div className="text-[12px] text-[#666B76]">휴게 시작 시간</div>
            </div>
            <div>—</div>
            <div className="flex flex-col gap-y-[4px] items-center">
              <div className="flex flex-row gap-x-[8px] px-[8px] items-center">
                <FormInput
                  label="form"
                  placeholder=""
                  containerClassName="w-[56px]"
                  value={breakHourEnd}
                  onChange={(e) => setBreakHourEnd(e.target.value)}
                />
                <div className="text-[16px]">:</div>
                <FormInput
                  label="form"
                  placeholder=""
                  containerClassName="w-[56px]"
                  value={breakMinuteEnd}
                  onChange={(e) => setBreakMinuteEnd(e.target.value)}
                />
              </div>
              <div className="text-[12px] text-[#666B76]">휴게 종료 시간</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2Form;
