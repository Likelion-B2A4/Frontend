import React from 'react';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import FormInput from '../components/FormInput';
import WeeklyButton from '../components/WeeklyButton';
import Step2Form from '../components/Step2Form';
import Step1Form from '../components/Step1Form';
import FileForm from '../components/FileForm';

interface IOperatingTime {
  mon: string | null;
  tue: string | null;
  wed: string | null;
  thu: string | null;
  fri: string | null;
  sat: string | null;
  sun: string | null;
}

interface IFormData {
  hospitalName: string;
  subject: string;
  address: string;
  contactNumber: string;
  operatingTime: IOperatingTime;
  mainImage: File | null;
}

interface Step2FormProps {
  operatingTime: IOperatingTime;
  selectedDays: (keyof IOperatingTime)[];
  onDayToggle: (dayKey: keyof IOperatingTime) => void;
  onBatchDayOffApply: () => void; // '휴무' 리모컨

  // '일괄 시간' state
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

const SignUpHosp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDays, setSelectedDays] = useState<(keyof IOperatingTime)[]>([]);

  // step2
  const [startHour, setStartHour] = useState('');
  const [startMinute, setStartMinute] = useState('');
  const [endHour, setEndHour] = useState('');
  const [endMinute, setEndMinute] = useState('');
  const [breakTime, setBreakTime] = useState(false);
  const [breakHourStart, setBreakHourStart] = useState('');
  const [breakMinuteStart, setBreakMinuteStart] = useState('');
  const [breakHourEnd, setBreakHourEnd] = useState('');
  const [breakMinuteEnd, setBreakMinuteEnd] = useState('');

  //폼 데이터를 객체로 관리
  const [formData, setFormData] = useState<IFormData>({
    hospitalName: '',
    subject: '',
    address: '',
    contactNumber: '',
    operatingTime: { mon: null, tue: null, wed: null, thu: null, fri: null, sat: null, sun: null },
    mainImage: null,
  });

  // 유효성 검사
  const isStep1Valid =
    formData.hospitalName !== '' &&
    formData.subject !== '' &&
    formData.address !== '' &&
    formData.contactNumber.length >= 9;

  const isTimeSaved = Object.values(formData.operatingTime).some((time) => time !== null);

  // 2. (지금 입력 중인 값) '일괄 적용'을 위해 시간을 입력 중인가?
  //    (선택된 요일이 있고, 시작/종료 시간을 모두 입력함)
  const isTimePending =
    selectedDays.length > 0 &&
    startHour !== '' &&
    startMinute !== '' &&
    endHour !== '' &&
    endMinute !== '';

  // 3. [최종] 둘 중 하나라도 'true'이면 2단계는 유효한 것으로 간주
  const isStep2Valid = isTimeSaved || isTimePending;

  // 이벤트 핸들러
  const handleDayToggle = (dayKey: keyof IOperatingTime) => {
    setSelectedDays((prev) =>
      prev.includes(dayKey) ? prev.filter((d) => d !== dayKey) : [...prev, dayKey]
    );
  };

  const applyBatchTime = (time: string) => {
    if (selectedDays.length === 0) return;

    setFormData((prev) => {
      const newTime = { ...prev.operatingTime };
      selectedDays.forEach((dayKey) => {
        newTime[dayKey] = time;
      });
      return { ...prev, operatingTime: newTime };
    });
  };

  const applyBatchDayOff = () => {
    if (selectedDays.length === 0) return;

    setFormData((prev) => {
      const newTime = { ...prev.operatingTime };
      selectedDays.forEach((dayKey) => {
        newTime[dayKey] = '휴무';
      });
      return { ...prev, operatingTime: newTime };
    });

    setSelectedDays([]); // 휴무 적용 후 선택 해제
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isStep1Valid) {
        setCurrentStep(2);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let finalOperatingTime = { ...formData.operatingTime };

    if (startHour && startMinute && endHour && endMinute && selectedDays.length > 0) {
      let combinedTime = `${startHour} : ${startMinute} ~ ${endHour} : ${endMinute}`;
      if (breakTime && breakHourStart && breakMinuteStart && breakHourEnd && breakMinuteEnd) {
        combinedTime += ` (휴식시간: ${breakHourStart} : ${breakMinuteStart} ~ ${breakHourEnd} : ${breakMinuteEnd})`;
      }
      selectedDays.forEach((dayKey) => {
        finalOperatingTime[dayKey] = combinedTime;
      });
    }

    if (isStep2Valid) {
      console.log('병원 가입 폼 데이터:', formData);
      alert('가입이 완료되었습니다!');
    }

    const isFinalStep2Valid = Object.values(finalOperatingTime).some((time) => time !== null);

    // 4. 1단계 유효성 + '최종' 2단계 유효성 동시 체크
    if (isStep1Valid && isFinalStep2Valid) {
      // 5. [핵심] 백엔드로 보낼 '최종 데이터'를 여기서 조립
      const finalDataToSend = {
        ...formData, // hospitalName, subject 등
        operatingTime: finalOperatingTime, // 👈 계산된 새 시간 객체로 덮어쓰기
      };

      console.log('병원 가입 폼 데이터:', finalDataToSend);
      alert('가입이 완료되었습니다! (콘솔 확인)');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFormData((prevData) => ({
        ...prevData,
        mainImage: file,
      }));
    }
  };

  const handleOperatingTimeChange = (dayKey: keyof IOperatingTime, value: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      operatingTime: {
        ...prevData.operatingTime, // 기존 시간 객체를 복사하고
        [dayKey]: value, // 👈 'mon' 키의 값만 새로 덮어쓰기
      },
    }));
  };

  return (
    <div className="max-w-[688px] my-[120px] mx-auto">
      {/* 안내문구 */}
      <div className="flex justify-center items-center mb-[105px] text-[24px]">
        등록할 병원 정보를 입력해주세요
      </div>
      {/* 폼 */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row max-w-[688px]">
          <FileForm mainImage={formData.mainImage} handleFileChange={handleFileChange} />
          <div>
            <div className="flex flex-1 flex-col max-w-[400px] min-h-[418px] justify-center items-center content-center">
              {/* 정보 입력 칸 */}
              {currentStep === 1 && (
                <Step1Form
                  formData={formData}
                  handleInputChange={handleInputChange}
                  onKeyDown={handleKeyDownEnter}
                />
              )}
              {currentStep === 2 && (
                <Step2Form
                  operatingTime={formData.operatingTime}
                  selectedDays={selectedDays}
                  onDayToggle={handleDayToggle}
                  onBatchTimeApply={applyBatchTime}
                  onBatchDayOffApply={applyBatchDayOff}
                  startHour={startHour}
                  setStartHour={setStartHour}
                  startMinute={startMinute}
                  setStartMinute={setStartMinute}
                  endHour={endHour}
                  setEndHour={setEndHour}
                  endMinute={endMinute}
                  setEndMinute={setEndMinute}
                  breakTime={breakTime}
                  setBreakTime={setBreakTime}
                  breakHourStart={breakHourStart}
                  setBreakHourStart={setBreakHourStart}
                  breakMinuteStart={breakMinuteStart}
                  setBreakMinuteStart={setBreakMinuteStart}
                  breakHourEnd={breakHourEnd}
                  setBreakHourEnd={setBreakHourEnd}
                  breakMinuteEnd={breakMinuteEnd}
                  setBreakMinuteEnd={setBreakMinuteEnd}
                />
              )}
              <div className="flex flex-col">
                <div>
                  <div className="flex flex-row gap-[12px] my-[32px] justify-center">
                    {/* 슬라이더 용 버튼 */}
                    <div
                      className={
                        `w-[8px] h-[8px] rounded-full outline-0 ` +
                        (currentStep === 1 ? 'bg-[#3D84FF]' : 'bg-[#E2E4E8]')
                      }
                      onClick={() => setCurrentStep(1)}
                    />
                    <div
                      className={
                        `w-[8px] h-[8px] rounded-full outline-0 ` +
                        (currentStep === 2 ? 'bg-[#3D84FF]' : 'bg-[#E2E4E8]')
                      }
                      onClick={() => setCurrentStep(2)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center content-center items-center">
                <Button
                  type="submit"
                  variant={isStep1Valid && isStep2Valid ? 'colored' : 'default'}
                  disabled={!(isStep1Valid && isStep2Valid)}
                >
                  완료
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpHosp;
