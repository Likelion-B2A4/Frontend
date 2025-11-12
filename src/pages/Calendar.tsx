import { addMonths, format, subMonths, add } from "date-fns";
import Topbar from "../layouts/Topbar";
import CalendarDays from "../components/Calendar/CalendarDays";
import CalendarCells from "../components/Calendar/CalendarCells";
import Bottombar from "../layouts/Bottombar";
import DailyRecord from "../components/Calendar/DailyRecord";
import { useState } from "react";

const Calendar = () => {
    const currentDate = new Date();
    const formatDate = format(currentDate, "yyyy-MM-dd");
    //console.log(formatDate);

    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    
    const onDateClick = (day: Date) => {
        setSelectedMonth(format(day, "MM"));
        setSelectedDay(format(day, "dd"));
        setIsClicked(true);
    }


    return (
        
    <div className="flex flex-col min-h-screen">
        <div className="flex justify-center">
            <Topbar title="진료 기록" />
        </div>
        <div className="flex flex-col mx-[20px] gap-[8px]">
            <CalendarDays />
            <CalendarCells currentDate={currentDate} onDateClick={onDateClick} selectedMonth={selectedMonth} selectedDay={selectedDay} mode={0}/>
            <DailyRecord selectedMonth={selectedMonth} selectedDay={selectedDay} onDateClick={onDateClick} isClicked={isClicked} />
        </div>
        
        <div>
            <Bottombar />
        </div>

    </div> 
        
    )
}

export default Calendar;