import { useEffect, useState } from 'react';

interface FileFormProps {
  mainImage: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 폼 컴포넌트

const FileForm = ({ mainImage, handleFileChange }: FileFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (!mainImage) {
      setPreviewImage(null);
      return;
    }
    const objectUrl = URL.createObjectURL(mainImage);
    setPreviewImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [mainImage]);
  return (
    <>
      <label
        htmlFor="mainImageInput"
        className="w-[208px] h-[208px] bg-[#F4F6F8] rounded-full flex flex-col items-center justify-center cursor-pointer mr-[80px]"
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="병원 사진 미리보기"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="flex flex-col items-center content-center justify-center gap-[8px]">
            <img src="/camera.svg" alt="카메라 아이콘" className="w-[24px]" />
            <span className="text-sm text-gray-500 mt-2 text-[#A9ACB2]">사진을 선택해주세요</span>
          </div>
        )}
      </label>
      <input
        type="file"
        id="mainImageInput"
        name="mainImage"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden" // 화면에서 숨김
      />
    </>
  );
};

export default FileForm;
