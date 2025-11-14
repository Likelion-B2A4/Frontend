import React from 'react';
import LocationIcon from '../../assets/hospitalmap/location.svg';
import PhoneCallIcon from '../../assets/hospitalmap/phonecall.svg';
import TimeIcon from '../../assets/hospitalmap/time.svg';
import StarOffIcon from '../../assets/hospitalmap/star-off.svg';
import StarOnIcon from '../../assets/hospitalmap/star-on.svg';

interface HospitalFavoriteContentProps {
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
  onFavoriteToggle?: () => void;
}

const HospitalFavoriteContent: React.FC<HospitalFavoriteContentProps> = ({
  image,
  name,
  department,
  address,
  hours,
  phone,
  isFavorite = false,
  onFavoriteToggle,
}) => {
  return (
    <div className="flex gap-4 items-center border-b border-[#f4f6f8] pb-4 px-5">
      {/* 병원 이미지 */}
      <div className="shrink-0 rounded-full overflow-hidden" style={{ width: '93px', height: '93px' }}>
        <img
          alt={name}
          className="w-full h-full object-cover"
          src={image}
        />
      </div>

      {/* 병원 정보 */}
      <div className="flex flex-col gap-2 flex-1">
        {/* 헤더 */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex items-end gap-2">
            <h3 className="text-[#1a1a1a] text-base font-semibold">
              {name}
            </h3>
            <p className="text-[#343841] text-xs font-medium">
              {department}
            </p>
          </div>
          {/* 즐겨찾기 */}
          <button
            onClick={onFavoriteToggle}
            className="shrink-0 cursor-pointer transition-transform hover:scale-110"
            aria-label="Toggle favorite"
          >
            <img
              src={isFavorite ? StarOnIcon : StarOffIcon}
              alt="favorite"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* 상세 정보 */}
        <div className="flex flex-col gap-2">
          {/* Location */}
          <div className="flex gap-2 items-start">
            <img
              src={LocationIcon}
              alt="location"
              className="w-4 h-4 shrink-0 mt-0.5"
            />
            <p className="text-[#343841] text-xs font-medium">
              {address}
            </p>
          </div>

          {/* Time */}
          <div className="flex gap-2 items-center">
            <img
              src={TimeIcon}
              alt="time"
              className="w-4 h-4 shrink-0"
            />
            <p className="text-[#343841] text-xs font-medium">
              {hours.day} {hours.startTime} - {hours.endTime}
            </p>
          </div>

          {/* Phone */}
          <div className="flex gap-2 items-center">
            <img
              src={PhoneCallIcon}
              alt="phone"
              className="w-4 h-4 shrink-0"
            />
            <p className="text-[#343841] text-xs font-medium opacity-80">
              {phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalFavoriteContent;
