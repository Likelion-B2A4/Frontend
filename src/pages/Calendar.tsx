import { addMonths, format, subMonths, add } from "date-fns";
import Topbar from "../layouts/Topbar";
import CalendarDays from "../components/Calendar/CalendarDays";
import CalendarCells from "../components/Calendar/CalendarCells";
import Bottombar from "../layouts/Bottombar";
import DailyRecord from "../components/Calendar/DailyRecord";
import { useEffect, useState } from "react";
import { mockMedicationData, mockDailyRecord } from "../mock/MedicationData";

const Calendar = () => {
    const currentDate = new Date();

    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const [calendarMedData, setCalendarMedData] = useState<Record<string, {hasMed: boolean} >>({});
    const [dailyRecordData, setDailyRecordData] = useState<any>(null);

    useEffect(() => {
        setCalendarMedData(mockMedicationData);
    }, []);
    
    const onDateClick = (day: Date) => {
        const dateString = format(day, "yyyy-MM-dd");

        setSelectedMonth(format(day, "MM"));
        setSelectedDay(format(day, "dd"));
        setIsClicked(true);

        setDailyRecordData(mockDailyRecord);
    }


    return (
        
    <div className="flex flex-col min-h-screen">
        <div className="flex justify-center">
            <Topbar title="진료 기록" />
        </div>
        <div className="flex flex-col mx-5 gap-2">
            <CalendarDays />
            <CalendarCells 
                currentDate={currentDate} 
                onDateClick={onDateClick} 
                selectedMonth={selectedMonth} 
                selectedDay={selectedDay} mode={0}
                calendarMedData = {calendarMedData}    
            />
            <DailyRecord 
                selectedMonth={selectedMonth} 
                selectedDay={selectedDay} 
                onDateClick={onDateClick} 
                isClicked={isClicked} 
                recordData={dailyRecordData}
            />
        </div>
        
        <div>
            <Bottombar />
        </div>

    </div> 
        
    )
}

export default Calendar;