import React from 'react';
import Button from '../components/Button';
import { useState, useEffect } from 'react';

interface IFormData {
  hospitalName: string;
  subject: string;
  address: string;
  contactNumber: string;
  operatingHours: string;
}

interface Step1FormProps {
  formData: IFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface Step2FormProps {
  formData: IFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Step1Form = ({ formData, handleInputChange, onKeyDown }: Step1FormProps) => {
  return (
    <div id="step1">
      {/* 병원가입 폼-1 */}
      <div>
        병원명
        <input
          type="text"
          placeholder="병원명을 입력하세요"
          value={formData.hospitalName}
          onChange={handleInputChange}
          name="hospitalName"
        />
      </div>
      <div>
        진료 과목
        <input
          type="text"
          placeholder="진료과목?"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
        />
      </div>{' '}
      {/* 드롭다운 선택지 */}
      <div>
        주소
        <input
          placeholder="병원 주소를 입력하세요"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        연락처
        <input
          placeholder="병원 연락처를 입력하세요"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
        />
      </div>{' '}
      {/* 숫자만 입력하면 하이픈 형태로 저장 */}
      {/* 다 입력하면 자동으로 페이지 넘어가게 */}
    </div>
  );
};

const Step2Form = ({ formData, handleInputChange }: Step2FormProps) => {
  return (
    <div id="step2">
      {/* 병원가입 폼-2 */}
      <div>
        운영시간
        <input
          name="operatingHours"
          placeholder="운영시간을 입력하세요"
          value={formData.operatingHours}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

const SignUpHosp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  //폼 데이터를 객체로 관리
  const [formData, setFormData] = useState({
    hospitalName: '',
    subject: '',
    address: '',
    contactNumber: '',
    operatingHours: '',
  });

  // 유효성 검사
  const isStep1Valid =
    formData.hospitalName !== '' &&
    formData.subject !== '' &&
    formData.address !== '' &&
    formData.contactNumber.length >= 9;

  const isStep2Valid = formData.operatingHours !== '';

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isStep1Valid) {
        setCurrentStep(2);
      }
    }
  };

  // 다음 단계로 이동
  //   useEffect(() => {
  //     if (currentStep === 1 && isStep1Valid && onkeydown=handleKeyDownEnter(e)) {
  //       // 1단계가 유효하면 2단계로 자동 이동
  //       setCurrentStep(2);
  //     }
  //   }, [formData, currentStep, isStep1Valid]);

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

  return (
    <div>
      {/* 안내문구 */}
      <div>등록할 병원 정보를 입력해주세요</div>
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <Step1Form
            formData={formData}
            handleInputChange={handleInputChange}
            onKeyDown={handleKeyDownEnter}
          />
        )}
        {currentStep === 2 && (
          <Step2Form formData={formData} handleInputChange={handleInputChange} />
        )}
        <div className="flex flex-row gap-[12px]">
          {/* 슬라이더 용 버튼 */}
          <div
            className={
              `w-[8px] h-[8px] rounded-full outline-0 ` +
              (currentStep === 1 ? 'bg-[#3D84FF]' : 'bg-[#E2E4E8]')
            }
          />
          <div
            className={
              `w-[8px] h-[8px] rounded-full outline-0 ` +
              (currentStep === 2 ? 'bg-[#3D84FF]' : 'bg-[#E2E4E8]')
            }
          />
        </div>
        <Button
          type="submit"
          variant={isStep1Valid && isStep2Valid ? 'colored' : 'default'}
          disabled={!(isStep1Valid && isStep2Valid)}
        >
          완료
        </Button>
      </form>
    </div>
  );
};

export default SignUpHosp;
