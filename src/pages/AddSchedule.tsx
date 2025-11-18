import { useState } from "react";
import Topbar from "../layouts/Topbar";
import { Icon } from "@iconify/react";
import Button from "../components/Button";
import BottomSheet from "../components/Calendar/BottomSheet";
import checkImg from "../assets/calendar/check.svg";
import defaultImg from "../assets/calendar/check_default.svg";
import CalendarModal from "../components/Calendar/CalendarModal";
import TimeModal from "../components/Calendar/TimeModal";
import { useNavigate } from "react-router-dom";
//import prevImg from "../../public/goback.svg";

const AddSchedule = () => {
    const nav = useNavigate();
    const [medName, setMedName] = useState("");

    const [isChecked, setIsChecked] = useState(
        new Array(4).fill(false)
    );

    const [dayCheck, setDayCheck] = useState(
        new Array(7).fill(false)
    );

    const [isCalendarOpen, setIsCalendarOpen] = useState([false, false]);
    const [isDateSelected, setIsDateSelected] = useState(false);

    const [notify, setNotify] = useState(true);
    const [startMonth, setStartMonth] = useState("");
    const [startDay, setStartDay] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [endDay, setEndDay] = useState("");

    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const [selectedTimes, setSelectedTimes] = useState<string[]>(new Array(4).fill(""));
    

    const onClickCheck = (index: number) => () => {
        const newChecked = [...isChecked];
        newChecked[index] = !newChecked[index];
        setIsChecked(newChecked);
        console.log(newChecked);

        if (!isChecked[index]) {
            setSelectedIndex(index);
            setIsTimeModalOpen(true);
        }
    }

    const onDayCheck = (index: number) => () => {
        const newChecked = [...dayCheck];
        newChecked[index] = !newChecked[index];
        setDayCheck(newChecked);
        console.log(newChecked);
    }

    const onClickCalendar = (index: number) => () => {
        const newCalendarCheck = [false, false]; 
        newCalendarCheck[index] = !isCalendarOpen[index];
        setIsCalendarOpen(newCalendarCheck);
        
        // 캘린더를 열 때, 버튼 비활성화 상태로 초기화
        if (newCalendarCheck[index]) {
            setIsDateSelected(false);
        }
        
    }
    //console.log(isCalendarOpen);

    const handleSelectedDate = (childMonth: string, childDay: string) => {
        if (isCalendarOpen[0]) {
            setStartMonth(childMonth);
            setStartDay(childDay);
        } else if (isCalendarOpen[1]) {
            setEndMonth(childMonth);
            setEndDay(childDay);
        }
    }
    //console.log(startMonth, startDay);

    const handleSelectionChange = (hasSelected: boolean) => {
        setIsDateSelected(hasSelected);
    }
    
    const exitModal = () => {
        setIsCalendarOpen([false, false]);
        setIsTimeModalOpen(false);
    }

    const formatDate = (month: string, day: string, dafaultText: string) => {
        return month && day ? `${month}월 ${day}일` : dafaultText;
    
    }

    const handleTimeChange = (time: {
        hour: string;
        minute: string;
        period: string
    }) => {
        if (selectedIndex === null) return;
        const newTimes = [...selectedTimes];
        newTimes[selectedIndex] = `${time.hour} : ${time.minute} ${time.period}`;
        setSelectedTimes(newTimes);
    }

    const getSelectedTime = (index: number) => {
        return selectedTimes[index] ? selectedTimes[index] : "시간을 선택하세요";
    }
    console.log(selectedTimes);

    const isFormValid =
        medName.trim() !== "" && 
        dayCheck.some(Boolean) && 
        startMonth && startDay && 
        endMonth && endDay && 
        isChecked.some((_, i) => isChecked[i] && selectedTimes[i] !== "");


    return (
        <>
        <div className="flex flex-col min-h-screen items-center px-[20px]">
            <div className="fixed items-center"> 
                <Topbar title="복약 일정 추가"/>
                <div>
                    <img src="/goback.svg" alt="prev" className="fixed top-[14px] cursor-pointer" onClick={() => nav(-1)}/>
                </div>
            </div>
            <form className="flex flex-col w-full gap-[32px] mt-[70px]">
                <div className="flex flex-col">
                    <p>약 이름</p>
                    <input 
                        type="text" 
                        placeholder="약 이름을 입력하세요" 
                        className="h-[48px] border border-b-[#A9ACB2] border-t-0 border-x-0 pl-[8px]"
                        value={medName}
                        onChange={(e) => setMedName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p>복용 주기</p>
                    <div className="flex flex-row text-[#666B76] justify-between">
                        {["월", "화", "수", "목", "금", "토", "일"].map((label, i) => (
                            <div key={i}
                                className={`w-11 h-11 rounded-[25px] flex justify-center items-center
                                ${dayCheck[i] ? 'bg-[#3D84FF] text-[#ffffff]' : 'bg-[#F4F6F8]'}`}
                                onClick={onDayCheck(i)}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                    <div className="h-[48px] flex flex-row gap-[8px] justify-between">
                        <div 
                            className="flex flex-row w-full justify-between py-[12px] px-[8px] border border-b-[#A9ACB2] border-t-0 border-x-0"
                            onClick={onClickCalendar(0)}
                        >
                            <div className={`w-full ${startDay ? 'text-[#1A1A1A]' : 'text-[#A9ACB2]'}`}>{formatDate(startMonth, startDay, "시작일")}</div>
                            <div className="w-[16px] h-[16px] cursor-pointer">
                                <Icon 
                                    icon="lets-icons:date-today"
                                    className="w-[16px] h-[16px] text-[#666B76]"
                                />
                            </div>
                        </div>
                        <div 
                            className="flex flex-row w-full justify-between py-[12px] px-[8px] border border-b-[#A9ACB2] border-t-0 border-x-0"
                            onClick={onClickCalendar(1)}
                        >
                            <div className={`w-full ${startDay ? 'text-[#1A1A1A]' : 'text-[#A9ACB2]'}`}>{formatDate(endMonth, endDay, "종료일")}</div>
                            <div className="w-[16px] h-[16px] cursor-pointer">
                                <Icon 
                                    icon="lets-icons:date-today"
                                    className="w-[16px] h-[16px] text-[#666B76]"
                                />
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="flex flex-col">
                    <p>복약 시간</p>
                    <div className="flex flex-col gap-[8px] text-[#666B76]">
                        {["아침", "점심", "저녁", "취침 전"].map((label, i) => (
                            <div key={i}
                                className="flex flex-row h-[48px] items-center justify-between">
                                    <div className="flex flex-row gap-[8px] items-center">
                                        <div
                                            className="w-[32px] h-[32px] items-center flex cursor-pointer"
                                            onClick={onClickCheck(i)}
                                        >
                                            {isChecked[i] ? (
                                                <img src={checkImg} alt="checked" />
                                            ) : (
                                                <img src={defaultImg} alt="default" />
                                            )}
                                        </div>
                                        <div className="font-semibold">{label}</div>
                                    </div>

                                    <div className="w-[220px] h-full flex justify-center items-center rounded-lg bg-[#F4F6F8] font-pretendard">
                                        <p className={selectedTimes[i] ? "text-[#343841]" : "text-[#A9ACB2]"}>
                                            {getSelectedTime(i)}
                                        </p>
                                    </div>
                            </div>
                        ))}
                        
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="text-[#1A1A1A]">알림 여부</div>

                    <label className="relative w-10 h-6 cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={notify} 
                        onChange={() => setNotify(!notify)} 
                    /> 

                    <div className={`
                        w-full h-full rounded-full transition-colors duration-300 
                        ${notify ? 'bg-[#3D84FF]' : 'bg-[#A9ACB2]'}
                    `}>
                    </div>
                    
                    <div className={`
                        absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[#ffffff] transition-transform duration-300 
                        ${notify ? 'translate-x-4' : 'translate-x-0'}
                    `}>
                    </div>
                </label>
                </div>
            </form>

            <div className="fixed bottom-8 w-[320px]">
                <Button 
                    children="등록" 
                    disabled={!isFormValid} 
                    variant={isFormValid ? "colored" : "default"} 
                    onClick={() => {alert("등록되었습니다."); nav("/medical-records")}}
                />
            </div>
            {(isCalendarOpen[0] || isCalendarOpen[1]) && 
                <BottomSheet 
                    title={isCalendarOpen[0] ? "시작일을 선택해주세요." : "종료일을 선택해주세요."}
                    content={<CalendarModal onSelectDate={handleSelectedDate} onSelectionChange={handleSelectionChange}/>}
                    onClick={exitModal}
                    isConfirmDisabled={!isDateSelected}
                    
            />}

            {isTimeModalOpen && (
                <BottomSheet
                    title={"복용 시간을 선택해주세요."}
                    content={<TimeModal onChangeTime={handleTimeChange}/>}
                    onClick={exitModal}
                    isConfirmDisabled={false}
                    
                />
            )}
        </div>
    
        </>
    )
}

export default AddSchedule;