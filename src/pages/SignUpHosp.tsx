import React from 'react';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import FormInput from '../components/FormInput';
import WeeklyButton from '../components/WeeklyButton';
import Step2Form from '../components/Step2Form';
import Step1Form from '../components/Step1Form';

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

interface FileFormProps {
  mainImage: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 폼 컴포넌트

const FileForm = ({ mainImage, handleFileChange }: FileFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (!mainImage) {
      setPreviewImage(null);
      return;
    }
    const objectUrl = URL.createObjectURL(mainImage);
    setPreviewImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [mainImage]);

  return (
    <>
      <label
        htmlFor="mainImageInput"
        className="w-[208px] h-[208px] bg-[#F4F6F8] rounded-full flex flex-col items-center justify-center cursor-pointer mr-[80px]"
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="병원 사진 미리보기"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="flex flex-col items-center content-center justify-center gap-[8px]">
            <img src="/camera.svg" alt="카메라 아이콘" className="w-[24px]" />
            <span className="text-sm text-gray-500 mt-2 text-[#A9ACB2]">사진을 선택해주세요</span>
          </div>
        )}
      </label>
      <input
        type="file"
        id="mainImageInput"
        name="mainImage"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden" // 화면에서 숨김
      />
    </>
  );
};

const SignUpHosp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDays, setSelectedDays] = useState<(keyof IOperatingTime)[]>([]);

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

  const isStep2Valid = {};

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
      return { ...prev, opreratingTime: newTime };
    });
  };

  const applyBatchDayOff = () => {
    if (selectedDays.length === 0) return;

    setFormData((prev) => {
      const newTime = { ...prev.operatingTime };
      selectedDays.forEach((dayKey) => {
        newTime[dayKey] = null;
      });
      return { ...prev, operatingTime: newTime };
    });
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
    if (isStep2Valid) {
      console.log('병원 가입 폼 데이터:', formData);
      alert('가입이 완료되었습니다!');
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
                />
              )}
              <div className="mt-[32px] flex flex-col">
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
