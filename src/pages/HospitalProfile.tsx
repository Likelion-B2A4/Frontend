import WebTopbar from '../layouts/WebTopbar';
import FileForm from '../components/FileForm';
import { hospHeader, logoText, hospitalProfileText } from '../styles/typography';
import Button from '../components/Button';

const mockData = {
  image: './data/hospital.jpg',
  name: '다나아병원',
  subject: '정형외과',
  address: '서울특별시 마포구 양화로 188 (동교동)',
  operatingTime: 'mon: 10:00-13:00',
  contact: '02-789-9800',
};

const HospitalProfile = () => {
  return (
    <div className="w-screen">
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
            <div id="운영일" className="flex flex-row gap-[8px]">
              <img src="../src/assets/profile/time.svg" className="w-[20px] h-[20px]" />
              {mockData.operatingTime}
            </div>
            <div id="연락처" className="flex flex-row gap-[8px]">
              <img src="../src/assets/profile/call.svg" className="w-[20px] h-[20px]" />
              {mockData.contact}
            </div>
          </div>
          <Button children="수정" variant="default" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
