import React from 'react';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import FormInput from '../components/FormInput';

interface IFormData {
  hospitalName: string;
  subject: string;
  address: string;
  contactNumber: string;
  operatingHours: string;
  mainImage: File | null;
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

interface FileFormProps {
  mainImage: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Step1Form = ({ formData, handleInputChange, onKeyDown }: Step1FormProps) => {
  return (
    <div id="step1" className="flex flex-col gap-y-[24px]">
      {/* 병원가입 폼-1 */}
      <div className="flex flex-row justify-between">
        <div>
          병원명
          <FormInput
            label="form"
            placeholder="병원명을 입력하세요"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* 드롭다운 선택지 */}
          진료 과목
          <FormInput
            label="form"
            placeholder="진료 과목을 입력하세요"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div>
        주소
        <FormInput
          label="form"
          placeholder="병원 주소를 입력하세요"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        연락처
        <FormInput
          label="form"
          placeholder="병원 연락처를 입력하세요"
          hint="숫자만 입력해주세요"
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

// const FileForm = ({ mainImage, handleFileChange }: FileFormProps) => {
//   return (
//     <>
//       <label
//         htmlFor="mainImage" // 5번의 input id와 연결
//         className="w-full aspect-square bg-gray-100 rounded-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
//       >
//         <img
//           src={URL.createObjectURL(mainImage)}
//           alt="병원 사진 미리보기"
//           className="w-full h-full object-cover rounded-full"
//         />
//         <input type="file" name="mainImage" onChange={handleFileChange} className="hidden" />;
//       </label>
//     </>
//   );
// };

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
    mainImage: null,
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

  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     e.preventDefault();
  //     if (e.target.files && e.target.files.length > 0) {
  //       const file = e.target.files[0];

  //       setFormData((prevData) => ({
  //         ...prevData,
  //         mainImage: file,
  //       }));
  //     }
  //   };

  return (
    <div className="my-[120px] mx-[296px]">
      {/* 안내문구 */}
      <div className="flex justify-center items-center mb-[105px] text-[24px]">
        등록할 병원 정보를 입력해주세요
      </div>
      {/* 폼 */}
      <form onSubmit={handleSubmit}>
        <div className="w-[208px] h-[208px]">사진입력</div>
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
        <div className="flex flex-row gap-[12px] mt-[32px] justify-center">
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
            onClick={isStep1Valid ? () => setCurrentStep(2) : () => {}}
          />
        </div>
        <div className="mt-[32px] flex justify-center content-center items-center">
          <Button
            type="submit"
            variant={isStep1Valid && isStep2Valid ? 'colored' : 'default'}
            disabled={!(isStep1Valid && isStep2Valid)}
          >
            완료
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpHosp;
