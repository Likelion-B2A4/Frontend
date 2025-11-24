import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../hooks/useChatStore';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwnMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-[#666B76] text-white px-4 py-2 rounded-full text-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-2 mb-4 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* 메시지 내용 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '8px 16px',
            alignItems: 'center',
            gap: '10px',
            borderRadius: isOwnMessage ? '12px 0 12px 12px' : '0 12px 12px 12px',
            background: isOwnMessage
              ? 'var(--color-main-variant, #3D84FF)'
              : 'var(--Greyscale-100, #F4F6F8)',
            color: isOwnMessage
              ? 'var(--Greyscale-White, #FFF)'
              : 'var(--Greyscale-900, #1A1A1A)',
            fontFamily: 'Pretendard',
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '150%',
            letterSpacing: '-0.28px',
            width: 'fit-content',
            maxWidth: '80%',
          }}
        >
          <p style={{ margin: 0, wordBreak: 'break-word' }}>
            {message.content}
          </p>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            color: isOwnMessage ? '#B3D9FF' : '#999',
            textAlign: isOwnMessage ? 'right' : 'left',
            paddingRight: isOwnMessage ? '16px' : '0',
            paddingLeft: isOwnMessage ? '0' : '16px',
          }}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
