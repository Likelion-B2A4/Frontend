import Button from "../Button";

interface Props {
    title: String,
    content: React.ReactNode;
    onClick: () => void;
    isConfirmDisabled: boolean;
    variant: string
}

const BottomSheet = ({title, content, onClick, isConfirmDisabled, variant} : Props) => {

    return (
        <div className="w-full h-full flex fixed inset-0 z-50 bg-[#000000]/50 backdrop-blur-sm items-end">
            <div className="relative flex flex-col bg-[#ffffff] w-full px-[20px] rounded-t-[16px] pb-[32px]">
                <div className="h-[36px] w-full flex justify-center items-center">
                    <div className="w-[48px] h-[4px] rounded-full bg-[#E2E4E8]"></div>
                </div>

                <div className="flex flex-col gap-[16px]">
                    <div className="font-pretendard font-semibold text-[20px] text-[#343841]">{title}</div>
                    <div>
                        {content}
                    </div>

                    <div className="flex justify-center items-center">
                        <Button children={"확인"} onClick={onClick} disabled={isConfirmDisabled} variant="colored"/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default BottomSheet;





