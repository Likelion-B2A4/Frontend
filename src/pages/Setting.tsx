import Topbar from '../layouts/Topbar';
import { topHeader } from '../styles/typography';
import ToggleSwitch from '../components/ToggleSwitch';
import { useState, type ReactEventHandler } from 'react';

const Setting = () => {
  const [isOn, setIsOn] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOn(e.target.checked);
  };

  return (
    <div>
      <Topbar title="설정" type="header" />
      {/* body */}
      <div style={topHeader}>
        <div className="flex flex-row justify-between py-[16px] px-[20px]">
          <div className="">위치 정보 권한</div>
          <ToggleSwitch id="location" checked={isOn} onChange={handleChange} />
        </div>
        <div className="py-[16px] px-[20px]">서비스 안내</div>
        <div className="py-[16px] px-[20px]">로그아웃</div>
      </div>
    </div>
  );
};

export default Setting;
