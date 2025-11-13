import React, { useRef, useEffect, useState } from 'react';
import { headerText, Dirty, hospitalDetailText } from '../../styles/typography';
import LocationIcon from '../../assets/hospitalmap/location.svg';
import PhoneCallIcon from '../../assets/hospitalmap/phonecall.svg';
import TimeIcon from '../../assets/hospitalmap/time.svg';
import './HospitalDetailBottomSheet.css';

interface HospitalDetailBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  hospital: {
    image: string;
    name: string;
    department: string;
    address: string;
    hours: {
      day: string;
      startTime: string;
      endTime: string;
    };
    phone: string;
    isFavorite?: boolean;
  };
  onFavoriteToggle?: () => void;
}

const HospitalDetailBottomSheet: React.FC<HospitalDetailBottomSheetProps> = ({
  isOpen,
  onClose,
  hospital,
  onFavoriteToggle,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  // 드래그 이동
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const diff = e.clientY - startY;
      if (diff > 0) {
        // 아래로만 드래그 가능
        setTranslateY(diff);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // 150px 이상 드래그하면 닫기
      if (translateY > 150) {
        onClose();
      }
      setTranslateY(0);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startY, translateY, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* 백그라운드 오버레이 */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 bg-white rounded-t-4xl shadow-lg z-50"
        style={{
          left: '50%',
          marginLeft: '-180px',
          width: '360px',
          transform: `translateY(${translateY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          animation: isOpen ? 'slideUp 0.3s ease-out' : 'slideDown 0.3s ease-out',
        }}
      >
        <div>
        {/* 드래그 핸들 */}
        <div
          className="flex justify-center pt-2 pb-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="bg-[#E2E4E8] h-1 rounded-full w-12" />
        </div>

        {/* 내용 */}
        <div className="flex flex-col gap-4 items-start px-5 pb-8">
          {/* 병원 사진 */}
          <div className="h-40 relative rounded-3xl shrink-0 w-full overflow-hidden">
            <img
              alt={hospital.name}
              className="w-full h-full object-cover"
              src={hospital.image}
            />
          </div>

          {/* 헤더 */}
          <div className="w-full flex items-start justify-between gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <h2 style={headerText} className="text-[#343841] text-xl font-semibold">
                  {hospital.name}
                </h2>
                <p style={Dirty}>
                  {hospital.department}
                </p>
              </div>
            </div>
            {/* 즐겨찾기 */}
            <button
              onClick={onFavoriteToggle}
              className="shrink-0 text-2xl cursor-pointer transition-transform hover:scale-110"
              aria-label="Toggle favorite"
            >
              {hospital.isFavorite ? '⭐' : '☆'}
            </button>
          </div>

          {/* 병원 정보 */}
          <div className="w-full max-w-xs flex flex-col gap-2">
            {/* Location */}
            <div className="flex gap-2 items-start w-full">
              <div className="shrink-0 mt-0.5">
                <img
                  src={LocationIcon}
                  alt="location"
                  className="w-4 h-4"
                />
              </div>
              <p style={hospitalDetailText}>
                {hospital.address}
              </p>
            </div>

            {/* Time */}
            <div className="flex gap-2 items-start w-full">
              <div className="shrink-0 mt-0.5">
                <img
                  src={TimeIcon}
                  alt="time"
                  className="w-4 h-4"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p style={hospitalDetailText}>
                  {hospital.hours.day} {hospital.hours.startTime} - {hospital.hours.endTime}
                </p>
              </div>
            </div>

            {/* Phonecall */}
            <div className="flex gap-2 items-center w-full">
              <div className="shrink-0">
                <img
                  src={PhoneCallIcon}
                  alt="phone"
                  className="w-4 h-4"
                />
              </div>
              <p style={hospitalDetailText}>
                {hospital.phone}
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default HospitalDetailBottomSheet;
