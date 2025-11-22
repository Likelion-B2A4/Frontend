import Topbar from '../layouts/Topbar';
import { topHeader } from '../styles/typography';
import ToggleSwitch from '../components/ToggleSwitch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { logoutPatientApi } from '../apis/auth';
import { useAuthStore } from '../hooks/useAuthStore';

const Setting = () => {
  const nav = useNavigate();
  const [isOn, setIsOn] = useState(true);
  const [isLogOut, setIsLogOut] = useState(false);
  const { clearAuth } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOn(e.target.checked);
  };

  const handleClickLogOut = () => {
    setIsLogOut(true);
  };

  const handleCloseModal = () => {
    setIsLogOut(false);
  };

  const handleLogout = async () => {
    try {
      // 1. 서버에 "나 갈게!" 하고 알려주기 (API 호출)
      await logoutPatientApi();
      console.log('서버 로그아웃 성공');
    } catch (error) {
      // 서버 에러가 나더라도, 프론트에서는 로그아웃 시켜주는 게 국룰입니다.
      console.error('로그아웃 에러(무시하고 진행):', error);
      // } finally {
      //   clearAuth();

      //   localStorage.removeItem('accessToken');
      //   localStorage.removeItem('refreshToken');

      //   alert('로그아웃 되었습니다.');
      //   nav('/');
    }
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
        <div className="py-[16px] px-[20px] hover:bg-gray-200" onClick={() => nav('/service')}>
          서비스 안내
        </div>
        <div className="py-[16px] px-[20px]" onClick={handleClickLogOut}>
          로그아웃
        </div>
      </div>
      <Modal
        isOpen={isLogOut}
        title="로그아웃"
        description={`지금 계정을 로그아웃할까요?\n다음에 다시 로그인할 수 있어요.`}
        confirmButtonText="확인"
        cancelButtonText="취소"
        onCancel={handleCloseModal}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Setting;
