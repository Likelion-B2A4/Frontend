import { useState } from "react";
import dotsImg from "../../assets/calendar/dots.svg";
import vectorImg from "../../assets/calendar/right_vector.svg";
import checkImg from "../../assets/calendar/check.svg";
import defaultImg from "../../assets/calendar/check_default.svg";
import { useNavigate } from "react-router-dom";

interface Props {
    selectedMonth : String,
    selectedDay : String,
    onDateClick : (day: Date) => void,
    isClicked : boolean
}

const DailyRecord = ({selectedMonth, selectedDay, isClicked} : Props) => {
    const nav = useNavigate();
    const mockData = ["아침", "점심", "저녁"];
    const [isOpen, setIsOpen] = useState(false);
    const [hasMedicalRecord, setHasMedicalRecord] = useState(true);
    const [hasMed, setHasMed] = useState(true);

    const [isChecked, setIsChecked] = useState(
        new Array(mockData.length).fill(false)
    );
    const onToggle = () => setIsOpen(!isOpen);
    const onOptionClick = (value: string, index: number) => () => {
        console.log(value);
        setIsOpen(false);
        if (index === 1) nav("/edit-schedule");
    }
    const onClickCheck = (index: number) => () => {
        const newChecked = [...isChecked];
        newChecked[index] = !newChecked[index];
        setIsChecked(newChecked);
        console.log(newChecked);
    }
    

    return (
        <div className="h-[190px] flex justify-center">
        {isClicked ? (
            <div className="w-full flex flex-col gap-2">
                <div className="w-full h-6 flex flex-row justify-between text-[#666B76] font-bold">
                    <div>{selectedMonth}월 {selectedDay}일</div>
                    <div className="cursor-pointer" onClick={onToggle}>
                        <img src={dotsImg} alt="edit" />
                    </div>
                </div>
                <div className="flex justify-end">
                {isOpen && (
                    <div className="px-4 flex flex-col items-center justify-center absolute bg-[#ffffff] rounded-lg">
                        <div 
                            onClick={onOptionClick("수정", 1)}
                            className="h-10 rounded-lg flex justify-center items-center"
                        >
                            복약 일정 수정
                        </div>
                        <div 
                            onClick={onOptionClick("삭제", 2)}
                            className="h-10 rounded-lg flex justify-center items-center"
                        >
                            복약 일정 삭제
                        </div>
                    </div>
                )}
                </div>

                <div className="w-full">
                    <div className="bg-[#F4F6F8] rounded-[12px] px-[20px] flex flex-row justify-between items-end">
                        {hasMedicalRecord ? (
                            <>
                            <div className="flex flex-col my-[16px] gap-[4px]">
                                <div>
                                    복통 및 어지러움 호소
                                </div>
                                <div className="text-[#666B76] text-[12px]">
                                    09:00
                                </div>
                            </div>

                            <div className="my-[16px]">
                                <div className="flex flex-row gap-[9px] cursor-pointer text-[#0C58FF]">
                                    <div>상세보기</div>
                                    <img src={vectorImg} alt="more_info"  />
                                </div> 
                            </div>
                            </>
                        ) : (
                            <div className="my-6 w-full flex justify-center items-center text-[#666B76] text-[12px]">
                                진료 기록은 진료 시 자동으로 추가돼요.
                            </div>
                        )}
                    </div>
                    <div className="px-[20px] flex flex-row justify-between">
                        {hasMed ? (
                            <>
                            <div className="flex flex-col my-[16px] gap-[4px]">
                                <div>
                                    약 이름
                                </div>
                                <div>
                                    {mockData.join('.')} 
                                </div>
                            </div>

                            <div className="my-[16px] flex flex-row">
                                {mockData.map((time, index) => (
                                    <div 
                                    key={index} 
                                    className="w-[32px] h-[32px] items-center flex cursor-pointer"
                                    onClick={onClickCheck(index)}
                                    >
                                        {isChecked[index] ? (
                                            <img src={checkImg} alt="" />
                                        ) : (
                                            <img src={defaultImg} alt="" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            </>
                        ) : (
                            <div className="w-full flex justify-center items-center my-[30px]">
                                <button 
                                    className="font-semibold text-[12px] text-[#666B76] cursor-pointer"
                                    onClick={() => nav("/add-schedule")}    
                                >
                                    복약 일정 추가 +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex items-center text-[#666B76]">
                <div>날짜를 선택하세요.</div>
            </div>
        )}
        
        </div>
    )
}

export default DailyRecord;