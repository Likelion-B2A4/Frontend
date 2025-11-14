import WebTopbar from '../layouts/WebTopbar';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface DoctorData {
  qr: string;
  doctorName: string;
  hospitalName: string;
  specialty: string;
  generatedAt: string;
  imageUrl?: string;
  profileImage?: string;
}

const QrCheckIn = () => {
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);

  useEffect(() => {
    // 임시데이터
    const mockData: DoctorData = {
      qr: "H1-D1-a1b2c3d4",
      doctorName: "김철수",
      hospitalName: "농인사랑병원",
      specialty: "외과·정형외과 전문의",
      generatedAt: "2025-10-28T10:00:00",
      profileImage: "https://via.placeholder.com/88", // 실제로는 API에서 받아올 이미지
      imageUrl: "https://via.placeholder.com/280" // QR코드 이미지
    };
    setDoctorData(mockData);
  }, []);

  if (!doctorData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen bg-white overflow-hidden">
      <WebTopbar showDoctorReselect={true} />

      <div className="flex-1 pt-[91px] flex flex-col items-center gap-[49px] w-full overflow-y-auto">
        {/* 의사 정보 영역 */}
        <div className="flex flex-col gap-4 items-center">
          {/* 의사 프로필 이미지 */}
          <div className="w-[88px] h-[88px] rounded-full overflow-hidden bg-gray-100">
            <img
              src={doctorData.profileImage}
              alt="doctor"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 의사 이름 및 정보 */}
          <div className="flex flex-col gap-1 items-center">
            <div className="text-[24px] font-semibold text-[#343841] text-center">
              <span>{doctorData.doctorName}</span>
              <span>의사</span>
            </div>
            <div className="text-base font-normal text-[#666B76] text-center">
              <span>{doctorData.hospitalName}</span>
              <span> · </span>
              <span>{doctorData.specialty}</span>
            </div>
          </div>
        </div>

        {/* QR코드 */}
        <div className="flex flex-col gap-8 items-center w-full px-10">
            <QRCodeSVG
              value={doctorData.qr}
              size={280}
              level="H"
            />
          <p className="text-[40px] font-semibold text-[#1a1a1a] text-center m-0">
            QR코드를 스캔하세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default QrCheckIn;
