import React from 'react';
import TypoLogo from '../components/TypoLogo';

interface TopbarProps {
  title?: string;
  showLogo?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ title, showLogo = false }) => {
  return (
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
