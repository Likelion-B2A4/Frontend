import React from 'react';
import FormInput from '../components/FormInput';
import { Dirty, hintDisabled, placeHolder } from '../styles/typography';
import { useState, useMemo } from 'react';
import SubjectDropdown from './SubjectDropdown';
import { pl } from 'date-fns/locale';

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
  handleSubjectChange: (value: string) => void;
}

// const [formData, setFormData] = useState({
//   hospitalName: '',
//   subject: '',
//   address: '',
//   contactNumber: '',
//   // ...
// });

// // 1. 'isDirty' 상태 계산
// const isDirty = useMemo(() => {
//   return (
//     formData.hospitalName !== '' ||
//     formData.subject !== '' ||
//     formData.address !== '' ||
//     formData.contactNumber !== ''
//   );
// }, [formData]);

const Step1Form = ({
  formData,
  handleInputChange,
  onKeyDown,
  handleSubjectChange,
}: Step1FormProps) => {
  const isHospitalNameFilled = formData.hospitalName.trim() !== '';
  const isSubjectFilled = formData.subject.trim() !== '';
  const isAddressFilled = formData.address.trim() !== '';
  const isContactNumberFilled = formData.contactNumber.trim() !== '';
  return (
    <div id="step1" style={Dirty} className="flex flex-col w-[400px] gap-y-[24px] min-h-[290px]">
      {/* 병원가입 폼-1 */}
      <div className="flex  gap-x-[16px]">
        <div className="w-1/2">
          병원명
          <FormInput
            label="form"
            placeholder="병원명을 입력하세요"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleInputChange}
            isDirty={isHospitalNameFilled}
            style={isHospitalNameFilled ? Dirty : placeHolder}
          />
        </div>
        <div className="w-1/2">
          {/* 드롭다운 선택지 */}
          진료 과목
          <SubjectDropdown
            placeholder="진료 과목을 입력하세요"
            // name="subject"
            value={formData.subject}
            onChange={handleSubjectChange}
            isDirty={isSubjectFilled}
            style={isSubjectFilled ? Dirty : placeHolder}
          />
          {/* <FormInput
            label="form"
            placeholder="진료 과목을 입력하세요"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            isDirty={isSubjectFilled}
          /> */}
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
          isDirty={isAddressFilled}
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
          isDirty={isContactNumberFilled}
        />
      </div>{' '}
      {/* 숫자만 입력하면 하이픈 형태로 저장 */}
      {/* 다 입력하면 자동으로 페이지 넘어가게 */}
    </div>
  );
};

export default Step1Form;
