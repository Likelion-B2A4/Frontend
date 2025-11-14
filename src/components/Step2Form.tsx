import { useEffect, useState } from 'react';
import WeeklyButton from './WeeklyButton';
import FormInput from './FormInput';
import { Dirty, hintDisabled } from '../styles/typography';
import Button from './Button';

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
  onBatchDayOffApply: (dayOff: boolean) => void;
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

const parseTime = (timeString: string | null) => {
  const defaults = {
    start: { hour: '', minute: '' },
    end: { hour: '', minute: '' },
    break: { start: { hour: '', minute: '' }, end: { hour: '', minute: '' } },
    isBreak: false,
    isDayOff: timeString === '휴무',
    mainTimeString: '',
    breakTimeString: '',
  };

  if (!timeString || timeString === '휴무') {
    return defaults;
  }

  const parts = timeString.split(' 휴게: ');
  const mainTimeStr = parts[0];
  const breakTimeStr = parts[1];

  const mainTimes = mainTimeStr.split(' ~ ');
  const startTimeParts = mainTimes[0]?.split(' : ') || ['', ''];
  const endTimeParts = mainTimes[1]?.split(' : ') || ['', ''];

  const result = {
    ...defaults,
    start: { hour: startTimeParts[0] || '', minute: startTimeParts[1] || '' },
    end: { hour: endTimeParts[0] || '', minute: endTimeParts[1] || '' },
    mainTimeString: mainTimeStr,
  };

  if (breakTimeStr) {
    result.isBreak = true;
    result.breakTimeString = breakTimeStr;
    const breakTimes = breakTimeStr.split(' ~ ');
    const breakStartParts = breakTimes[0]?.split(' : ') || ['', ''];
    const breakEndParts = breakTimes[1]?.split(' : ') || ['', ''];
    result.break = {
      start: { hour: breakStartParts[0] || '', minute: breakStartParts[1] || '' },
      end: { hour: breakEndParts[0] || '', minute: breakEndParts[1] || '' },
    };
  }

  return result;
};

const Step2Form = ({
  operatingTime,
  selectedDays,
  onDayToggle,
  onBatchTimeApply,
  onBatchDayOffApply,
}: Step2FormProps) => {
  const [breakTime, setBreakTime] = useState(false);
  const [dayOff, setDayOff] = useState(false);
  const [clinicLocked, setClinicLocked] = useState(false);
  const [breakLocked, setBreakLocked] = useState(false);

  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');

  const [breakHourStart, setBreakHourStart] = useState('');
  const [breakMinuteStart, setBreakMinuteStart] = useState('');
  const [breakHourEnd, setBreakHourEnd] = useState('');
  const [breakMinuteEnd, setBreakMinuteEnd] = useState('');

  const isSingleSelection = selectedDays.length === 1;

  const hasValidMainTime = () =>
    [startHour, startMinute, endHour, endMinute].every((value) => value.trim() !== '');

  const hasValidBreakTime = () =>
    [breakHourStart, breakMinuteStart, breakHourEnd, breakMinuteEnd].every(
      (value) => value.trim() !== ''
    );

  const buildMainTimeString = () => `${startHour} : ${startMinute} ~ ${endHour} : ${endMinute}`;

  const buildBreakTimeString = () =>
    `${breakHourStart} : ${breakMinuteStart} ~ ${breakHourEnd} : ${breakMinuteEnd}`;

  // useEffect(() => {
  //   if (selectedDays.length === 1) {
  //     const dayKey = selectedDays[0];
  //     const savedTime = operatingTime[dayKey];

  //     const parsed = parseTime(savedTime);

  //     setStartHour(parsed.start.hour);
  //     setStartMinute(parsed.start.minute);
  //     setEndHour(parsed.end.hour);
  //     setEndMinute(parsed.end.minute);

  //     setBreakTime(parsed.isBreak);
  //     setBreakHourStart(parsed.break.start.hour);
  //     setBreakMinuteStart(parsed.break.start.minute);
  //     setBreakHourEnd(parsed.break.end.hour);
  //     setBreakMinuteEnd(parsed.break.end.minute);

  //     setDayOff(parsed.isDayOff);
  //     setClinicLocked(!!savedTime && !parsed.isDayOff);
  //     setBreakLocked(parsed.isBreak);
  //   } else if(operatingTime) {
  //     setStartHour('');
  //     setStartMinute('');
  //     setEndHour('');
  //     setEndMinute('');
  //     setBreakTime(false);
  //     setBreakHourStart('');
  //     setBreakMinuteStart('');
  //     setBreakHourEnd('');
  //     setBreakMinuteEnd('');
  //     setDayOff(false);
  //     setClinicLocked(false);
  //     setBreakLocked(false);
  //   }
  // }, [selectedDays, operatingTime]);

  // 핸들러 함수

  useEffect(() => {
    // 공통 폼 리셋 함수
    const resetForm = () => {
      setStartHour('');
      setStartMinute('');
      setEndHour('');
      setEndMinute('');
      setBreakTime(false);
      setBreakHourStart('');
      setBreakMinuteStart('');
      setBreakHourEnd('');
      setBreakMinuteEnd('');
      // setDayOff(false);
      setClinicLocked(false);
      setBreakLocked(false);
    };

    if (selectedDays.length === 0) {
      // 0. 선택 없음: 폼 리셋
      resetForm();
    } else if (isSingleSelection) {
      // 1. 단일 선택: 폼에 데이터 로드 (개별 수정)
      const dayKey = selectedDays[0];
      const savedTime = operatingTime[dayKey];
      const parsed = parseTime(savedTime);

      setStartHour(parsed.start.hour);
      setStartMinute(parsed.start.minute);
      setEndHour(parsed.end.hour);
      setEndMinute(parsed.end.minute);

      setBreakTime(parsed.isBreak);
      setBreakHourStart(parsed.break.start.hour);
      setBreakMinuteStart(parsed.break.start.minute);
      setBreakHourEnd(parsed.break.end.hour);
      setBreakMinuteEnd(parsed.break.end.minute);

      setDayOff(parsed.isDayOff);
      setClinicLocked(!!savedTime && !parsed.isDayOff); // '휴무'가 아니면 잠금
      setBreakLocked(parsed.isBreak); // 휴게 시간이 있으면 잠금
    } else {
      // 2. 다중 선택 (일괄 적용)
      const firstDayKey = selectedDays[0];
      const firstTime = operatingTime[firstDayKey];

      // '월수금'처럼 모두 동일한 데이터가 있는지, '화목토'처럼 모두 비어있는지 확인
      const allSame = selectedDays.every((dayKey) => operatingTime[dayKey] === firstTime);

      if (allSame) {
        // (A) '월수금' (모두 동일) 또는 '화목토' (모두 null)
        const parsed = parseTime(firstTime); // firstTime이 null이어도 parseTime이 처리함

        setStartHour(parsed.start.hour);
        setStartMinute(parsed.start.minute);
        setEndHour(parsed.end.hour);
        setEndMinute(parsed.end.minute);

        setBreakTime(parsed.isBreak);
        setBreakHourStart(parsed.break.start.hour);
        setBreakMinuteStart(parsed.break.start.minute);
        setBreakHourEnd(parsed.break.end.hour);
        setBreakMinuteEnd(parsed.break.end.minute);

        setDayOff(parsed.isDayOff);
        // '화목토'(firstTime === null)가 아니거나, '휴무'가 아닐 때 잠금
        setClinicLocked(!!firstTime && !parsed.isDayOff);
        setBreakLocked(parsed.isBreak);
      } else {
        // (B) '월, 화'처럼 데이터가 섞인 경우: 폼 리셋
        resetForm();
      }
    }
  }, [selectedDays, operatingTime, isSingleSelection]);

  const handleClinicTimeApplyClick = () => {
    if (selectedDays.length === 0) {
      console.error('요일을 먼저 선택해주세요.');
      return;
    }

    if (clinicLocked && isSingleSelection) {
      setClinicLocked(false); // 수정 모드
      return;
    }

    if (!hasValidMainTime()) {
      console.error('진료 시간을 모두 입력해주세요');
      return;
    }

    let combinedTime = buildMainTimeString();

    // ★★★ (버그 수정) 주석 해제: 휴게 시간 보존 로직 ★★★
    if (isSingleSelection) {
      // 단일 모드: '이미 저장된' 휴게 시간을 보존합니다.
      const parsed = parseTime(operatingTime[selectedDays[0]]);
      if (parsed.isBreak && parsed.breakTimeString) {
        combinedTime += ` 휴게: ${parsed.breakTimeString}`;
      }
    }
    // (일괄 적용 모드에서는 '진료 시간'만 덮어씁니다)

    // ★★★ (버그 수정) '잠금'은 단일 선택일 때만 적용 ★★★
    if (isSingleSelection) {
      setClinicLocked(true);
    }
    onBatchTimeApply(combinedTime);
  };

  const handleBreakTimeCheckboxToggle = () => {
    if (dayOff) return;

    // ★ 추가: 개별 수정 모드에서는 진료 시간이 먼저 잠겨있어야 합니다.
    if (isSingleSelection && !clinicLocked) {
      console.error('진료 시간을 먼저 입력 완료해주세요.');
      return;
    }

    const nextState = !breakTime;
    setBreakTime(nextState); // UI 즉시 반영

    if (!nextState) {
      // 휴게시간 체크를 '해제'하는 경우
      setBreakHourStart('');
      setBreakMinuteStart('');
      setBreakHourEnd('');
      setBreakMinuteEnd('');
      setBreakLocked(false);

      // '휴게 시간'이 제거된 상태로 즉시 저장합니다.
      if (selectedDays.length > 0 && hasValidMainTime()) {
        onBatchTimeApply(buildMainTimeString());
      }
    }
  };

  const handleBreakApplyClick = () => {
    if (selectedDays.length === 0) {
      console.error('요일을 먼저 선택해주세요.');
      return;
    }

    if (breakLocked) {
      setBreakLocked(false); // 수정 모드
      return;
    } else setBreakLocked(true);

    if (isSingleSelection && !clinicLocked) {
      console.error('진료 시간을 먼저 입력 완료하세요.');
      return;
    }

    if (!breakTime) {
      console.error('휴게시간을 먼저 활성화해주세요.');
      return;
    }

    if (!hasValidBreakTime()) {
      console.error('휴게 시간을 모두 입력해주세요');
      return;
    }

    // 진료 시간과 휴게 시간을 합쳐서 저장
    onBatchTimeApply(`${buildMainTimeString()} 휴게: ${buildBreakTimeString()}`);
  };

  const handleDayOffToggle = () => {
    if (selectedDays.length === 0) {
      alert('요일을 먼저 선택해주세요.');
      return;
    }

    const newDayOffState = !dayOff;
    setDayOff(newDayOffState);

    if (newDayOffState) {
      setBreakTime(false);
      setBreakLocked(false);
      onBatchDayOffApply(true);
    } else {
      onBatchDayOffApply(false);
    }
  };

  const isClinicDisabled = dayOff || (clinicLocked && selectedDays.length > 0);
  const isBreakDisabled = dayOff || !breakTime || (breakLocked && selectedDays.length > 0);
  // ★ 수정: 버튼 라벨 로직 수정 (isSingleSelection 추가)
  const clinicButtonLabel = clinicLocked ? '수정' : '입력 완료';
  const breakButtonLabel = breakLocked ? '수정' : '입력 완료';

  const isClinicButtonDisabled = () => {
    if (dayOff || selectedDays.length === 0) return true; // 휴무거나, 선택된 요일이 없으면 비활성
    if (clinicLocked && isSingleSelection) return false; // '수정' 모드는 항상 활성
    if (!hasValidMainTime()) return true; // ★★★ 폼이 비어있으면 비활성 ★★★
    return false; // 그 외 (폼이 유효한 '입력 완료')는 활성
  };

  // JSX에서 사용하기 위해 변수에 할당
  const clinicDisabled = isClinicButtonDisabled();

  return (
    <div className="min-h-[290px]">
      <div style={Dirty}>운영일 선택</div>
      <div>
        <div className="flex flex-row gap-x-[2px] mb-[8px] mt-[16px]">
          {weeklist.map((day) => {
            const dayKey = day.key as keyof IOperatingTime;
            const isSaved = !!operatingTime[dayKey]; // '휴무' 포함, 저장된 값이 있으면 true

            return (
              <WeeklyButton
                key={day.key}
                day={day.name}
                // isSaved prop이 WeeklyButton 컴포넌트에 필요합니다.
                // @ts-ignore (WeeklyButton 목업에 isSaved 추가 필요)
                isSaved={isSaved}
                isSelected={selectedDays.includes(dayKey)}
                onDayClick={() => onDayToggle(dayKey)}
                disabled={false}
              />
            );
          })}
        </div>
        <div
          className={
            `flex flex-row gap-x-[50px] ` +
            `${isClinicDisabled ? 'opacity-50 cursor-not-allowed' : ' '}`
          }
        >
          {/* 진료시간 선택 */}
          <div
            className={
              `flex flex-row gap-x-[4px] items-center mb-[24px]` +
              `${isClinicDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`
            }
          >
            <div className="flex flex-col gap-y-[4px]">
              <div className="flex flex-row gap-x-[8px] px-[8px] items-center">
                <FormInput
                  label="form"
                  placeholder=""
                  containerClassName="w-[56px]"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  disabled={isClinicDisabled}
                  maxLength={2}
                />
                <div className="text-[16px]">:</div>
                <FormInput
                  label="form"
                  placeholder=""
                  containerClassName="w-[56px]"
                  value={startMinute}
                  onChange={(e) => setStartMinute(e.target.value)}
                  disabled={isClinicDisabled}
                  maxLength={2}
                />
              </div>
              <div className="text-start justify-end ml-2" style={hintDisabled}>
                진료 시작 시간
              </div>
            </div>
            <div>—</div>
            <div className="flex flex-col gap-y-[4px]">
              <div className="flex flex-row gap-x-[8px] px-[8px] items-center">
                <FormInput
                  label="form"
                  placeholder=""
                  containerClassName="w-[56px]"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  disabled={isClinicDisabled}
                  maxLength={2}
                />
                <div className="text-[16px]">:</div>
                <FormInput
                  label="form"
                  placeholder=""
                  containerClassName="w-[56px]"
                  value={endMinute}
                  onChange={(e) => setEndMinute(e.target.value)}
                  disabled={isClinicDisabled}
                  maxLength={2}
                />
              </div>
              <div className="ml-2" style={hintDisabled}>
                진료 종료 시간
              </div>
            </div>
          </div>
          <div>
            <Button
              type="button"
              size="mini"
              isMobile={false}
              children={clinicButtonLabel}
              disabled={dayOff}
              onClick={handleClinicTimeApplyClick}
              variant={
                clinicDisabled || (clinicLocked && isSingleSelection) ? 'default' : 'colored'
              }
            />
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-start items-center gap-x-[8px] mt-[24px]">
            <div
              onClick={handleBreakTimeCheckboxToggle}
              className={`flex flex-row gap-x-[8px] items-center ${
                dayOff ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <img
                src={breakTime ? '/check_filled.svg' : '/check_unfilled.svg'}
                className="w-[32px] h-[32px] "
              />
            </div>

            <div className="tect-[16px] mb-0" style={Dirty}>
              휴게시간
            </div>
          </div>
          {breakTime && (
            <div className="flex flex-row gap-[50px]">
              <div className="flex flex-row">
                <div className="flex flex-col gap-y-[4px]">
                  <div className="flex flex-row gap-x-[8px] px-[8px] items-center">
                    <FormInput
                      label="form"
                      placeholder=""
                      containerClassName="w-[56px]"
                      value={breakHourStart}
                      onChange={(e) => setBreakHourStart(e.target.value)}
                      disabled={isBreakDisabled}
                      maxLength={2}
                    />
                    <div className="text-[16px]">:</div>
                    <FormInput
                      label="form"
                      placeholder=""
                      containerClassName="w-[56px]"
                      value={breakMinuteStart}
                      onChange={(e) => setBreakMinuteStart(e.target.value)}
                      disabled={isBreakDisabled}
                      maxLength={2}
                    />
                  </div>
                  <div className="text-[12px] text-[#666B76] ml-2" style={hintDisabled}>
                    휴게 시작 시간
                  </div>
                </div>
                <div>—</div>
                <div className="flex flex-col gap-y-[4px]">
                  <div className="flex flex-row gap-x-[8px] px-[8px] items-center">
                    <FormInput
                      label="form"
                      placeholder=""
                      containerClassName="w-[56px]"
                      value={breakHourEnd}
                      onChange={(e) => setBreakHourEnd(e.target.value)}
                      disabled={isBreakDisabled}
                      maxLength={2}
                    />
                    <div className="text-[16px]">:</div>
                    <FormInput
                      label="form"
                      placeholder=""
                      containerClassName="w-[56px]"
                      value={breakMinuteEnd}
                      onChange={(e) => setBreakMinuteEnd(e.target.value)}
                      disabled={isBreakDisabled}
                      maxLength={2}
                    />
                  </div>
                  <div className="text-[12px] text-[#666B76] ml-2" style={hintDisabled}>
                    휴게 종료 시간
                  </div>
                </div>
              </div>
              <div>
                <Button
                  size="mini"
                  type="button"
                  isMobile={false}
                  children={breakButtonLabel}
                  disabled={dayOff || !breakTime}
                  onClick={handleBreakApplyClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        onClick={handleDayOffToggle}
        className="flex flex-row gap-x-[8px] mt-[24px] items-center"
      >
        <img
          src={dayOff ? '/check_filled.svg' : '/check_unfilled.svg'}
          className="w-[32px] h-[32px] "
        />
        <div className="" style={Dirty}>
          휴무
        </div>
      </div>
    </div>
  );
};

export default Step2Form;
