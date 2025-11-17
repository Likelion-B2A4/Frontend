import React from 'react';
import { headerText, Dirty } from '../styles/typography';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string | React.ReactNode;
  children?: React.ReactNode;
  buttons?: ModalButton[];
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel: () => void;
  onConfirm?: () => void;
  closeIcon?: boolean;
  isMobile?: boolean;
  variant?: 'default' | 'confirmation' | 'selection';
}

interface ModalButton {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'colored';
}

const Modal = ({
  isOpen,
  title,
  description,
  children,
  buttons,
  cancelButtonText = '취소',
  confirmButtonText = '허용',
  onCancel,
  onConfirm,
  closeIcon = true,
  isMobile = true,
}: ModalProps) => {
  if (!isOpen) return null;

  // buttons props가 있으면 그걸 사용, 없으면 기본 버튼 생성
  const buttonList = buttons || [
    { label: cancelButtonText, onClick: onCancel, variant: 'default' as const },
    {
      label: confirmButtonText,
      onClick: onConfirm || onCancel,
      variant: 'colored' as const,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-xl w-[90%] ${
          isMobile ? 'max-w-[320px]' : 'max-w-[400px]'
        } p-6 flex flex-col gap-6`}
      >
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 style={headerText} className="text-[#343841]">
              {title}
            </h2>
            {closeIcon && (
              <button
                onClick={onCancel}
                className="cursor-pointer text-[24px] text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>

          {/* Description */}
          {description && (
            <div style={Dirty} className="text-[#1A1A1A]">
              {typeof description === 'string' ? (
                <div>
                  {description.split('\n').map((line, index) => (
                    <p key={index} className="mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                description
              )}
            </div>
          )}
        </div>

        {/* Children Content */}
        {children && <div>{children}</div>}

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          {buttonList.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className={`w-full h-14 rounded-xl font-semibold text-[20px] cursor-pointer transition-colors ${
                btn.variant === 'colored'
                  ? 'bg-[#3D84FF] text-white hover:bg-[#2E6BD4]'
                  : 'bg-[#F4F6F8] text-[#343841] hover:bg-[#E8EAED]'
              }`}
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 600,
                lineHeight: '150%',
                letterSpacing: '-0.4px',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
