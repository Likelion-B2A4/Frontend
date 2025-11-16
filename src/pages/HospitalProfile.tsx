import WebTopbar from '../layouts/WebTopbar';
import FileForm from '../components/FileForm';
import { hospHeader, logoText, hospitalProfileText } from '../styles/typography';
import Button from '../components/Button';
import { useState } from 'react';
import { de } from 'date-fns/locale';

const mockData = {
  image: './data/hospital.jpg',
  name: '다나아병원',
  subject: '정형외과',
  address: '서울특별시 마포구 양화로 188 (동교동)',
  operatingTime: [
    { day: '월', hours: '09:00 - 18:00', break: '12:00 - 13:00 휴게시간' },
    { day: '화', hours: '09:00 - 18:00', break: '12:00 - 13:00 휴게시간' },
    { day: '수', hours: '09:00 - 18:00', break: '12:00 - 13:00 휴게시간' },
    { day: '목', hours: '09:00 - 18:00', break: '12:00 - 13:00 휴게시간' },
    { day: '금', hours: '09:00 - 18:00', break: '12:00 - 13:00 휴게시간' },
    { day: '토', hours: '09:00 - 14:00', break: '휴게시간 없음' },
    { day: '일', hours: '휴무', break: null },
  ],
  contact: '02-789-9800',
};

const defaultTime = mockData.operatingTime[0];

const HospitalProfile = () => {
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  return (
    <div className="w-screen max-h-screen">
      <WebTopbar />
      <div className="flex justify-center mt-[128px] ">
        <div id="병원 프로필 div" className="flex flex-col h-screen w-[400px] gap-y-[48px] ">
          <div
            id="프로필 기본 정보"
            className="flex flex-col justify-center items-center content-center gap-y-[16px]"
          >
            <FileForm mainImage={null} type="profile" />
            <div
              id="텍스트 디바이스"
              className="flex flex-col justify-center items-center content-center"
            >
              <div id="병원 이름" style={hospHeader}>
                {mockData.name}
              </div>
              <div id="진료 과목" style={logoText}>
                {mockData.subject}
              </div>
            </div>
          </div>
          <div
            id="위치 영업일 연락처"
            className="flex flex-col mb-[120px] gap-y-[8px]"
            style={hospitalProfileText}
          >
            <div id="위치" className="flex flex-row gap-[8px]">
              <img src="../src/assets/profile/location.svg" className="w-[20px] h-[20px]" />
              {mockData.address}
            </div>
            <div id="운영일" className="flex flex-row gap-[8px] ">
              <div>
                <img src="../src/assets/profile/time.svg" className="w-[20px] h-[20px]" />
              </div>
              <div className="flex w-full max-h-[145px] overflow-y-auto ">
                {isTimeOpen ? (
                  <div className="flex flex-col">
                    {mockData.operatingTime.map((item) => (
                      <div className="flex flex-row gap-x-[4px]">
                        <div>{item.day}</div>
                        <div>
                          {item.hours}
                          {item.break && <div className="">{item.break}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-row gap-x-[4px]">
                    <div>{defaultTime.day}</div>
                    <div>{defaultTime.hours}</div>
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  setIsTimeOpen(!isTimeOpen);
                }}
                className="itmes-center"
              >
                <img
                  src="/dropdown.svg"
                  className={
                    `flex-shrink-0 transition-transform duration-200 ` +
                    (isTimeOpen ? 'rotate-0' : 'rotate-180')
                  }
                />
              </div>
            </div>
            <div id="연락처" className="flex flex-row gap-[8px]">
              <img src="../src/assets/profile/call.svg" className="w-[20px] h-[20px]" />
              {mockData.contact}
            </div>
          </div>
          <div className=" w-[400px] absolute bottom-4">
            <Button children="수정" variant="default" className="w-full " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
