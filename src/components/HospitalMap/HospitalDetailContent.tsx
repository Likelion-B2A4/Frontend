import React from 'react';
import LocationIcon from '../../assets/hospitalmap/location.svg';
import PhoneCallIcon from '../../assets/hospitalmap/phonecall.svg';
import TimeIcon from '../../assets/hospitalmap/time.svg';
import StarOffIcon from '../../assets/hospitalmap/star-off.svg';
import StarOnIcon from '../../assets/hospitalmap/star-on.svg';

interface HospitalDetailContentProps {
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

const HospitalDetailContent: React.FC<HospitalDetailContentProps> = ({
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
    <div className="flex flex-col gap-4 items-start w-full">
      {/* 병원 사진 */}
      <div className="h-40 relative rounded-2xl shrink-0 w-full overflow-hidden">
        <img
          alt={name}
          className="w-full h-full object-cover"
          src={image}
        />
      </div>

      {/* 헤더 */}
      <div className="w-full flex items-start justify-between gap-2">
        <div className="flex items-end gap-2">
          <h2 className="text-[#343841] text-2xl font-semibold">
            {name}
          </h2>
          <p className="text-[#1a1a1a] text-base font-normal">
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

      {/* 병원 정보 */}
      <div className="w-full flex flex-col gap-2">
        {/* Location */}
        <div className="flex gap-2 items-center w-full">
          <div className="shrink-0">
            <img
              src={LocationIcon}
              alt="location"
              className="w-4 h-4"
            />
          </div>
          <p className="text-[#343841] text-sm font-medium">
            {address}
          </p>
        </div>

        {/* Time */}
        <div className="flex gap-2 items-center w-full">
          <div className="shrink-0">
            <img
              src={TimeIcon}
              alt="time"
              className="w-4 h-4"
            />
          </div>
          <p className="text-[#343841] text-sm font-medium">
            {hours.day} {hours.startTime} - {hours.endTime}
          </p>
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
          <p className="text-[#343841] text-sm font-medium opacity-80">
            {phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailContent;
