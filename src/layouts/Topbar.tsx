import React from 'react';
import TypoLogo from '../components/TypoLogo';
import { topHeader } from '../styles/typography';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  title?: string;
  showLogo?: boolean;
  type?: string;
}

const Topbar: React.FC<TopbarProps> = ({ title, showLogo = false, type = '' }) => {
  const nav = useNavigate();

  return type === 'header' ? (
    <div className="mx-[20px] my-[14px]">
      <div className="flex flex-row justify-center">
        <img src="/goback.svg" className="w-[24px] absolute left-[20px]" onClick={() => nav(-1)} />
        <div style={topHeader}>{title}</div>
      </div>
    </div>
  ) : (
    <div
      className="topbar-container"
      style={{
        width: '360px',
        height: '52px',
        background: 'var(--Greyscale-White, #FFF)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showLogo ? (
        <TypoLogo width={48} height={27} />
      ) : (
        <span
          style={{
            fontFamily: 'Pretendard',
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '150%',
            letterSpacing: '-0.32px',
          }}
        >
          {title}
        </span>
      )}
    </div>
  );
};

export default Topbar;
