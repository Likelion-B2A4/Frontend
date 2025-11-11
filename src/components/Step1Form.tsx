import React from 'react';
import FormInput from '../components/FormInput';
import { Dirty, hintDisabled } from '../styles/typography';

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

interface Step1FormProps {
  formData: IFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Step1Form = ({ formData, handleInputChange, onKeyDown }: Step1FormProps) => {
  return (
    <div id="step1" style={Dirty} className="flex flex-col gap-y-[24px] min-h-[290px]">
      {/* 병원가입 폼-1 */}
      <div className="flex flex-row justify-between gap-x-[16px]">
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

export default Step1Form;
