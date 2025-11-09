import CalendarCells from "./CalendarCells"
import CalendarDays from "./CalendarDays";
import {format} from "date-fns";
import { useState } from "react";

interface ChildProps {
    onSelectDate : (month: string, day: string) => void;
    onSelectionChange: (hasSelected: boolean) => void;
}

const CalendarModal = ({onSelectDate, onSelectionChange} : ChildProps) => {
    const currentDate = new Date();

    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    //const [isClicked, setIsClicked] = useState(false);
    
    const onDateClick = (day: Date) => {
        const month = format(day, "MM");
        const date = format(day, "dd");

        setSelectedMonth(month);
        setSelectedDay(date);
        onSelectDate(month, date); 
        onSelectionChange(true);
    }
    //console.log(selectedMonth, selectedDay)

    return (
        <div>
            <CalendarDays />
            <CalendarCells 
                currentDate={currentDate}
                onDateClick={onDateClick} 
                selectedDay={selectedDay} 
                selectedMonth={selectedMonth} 
                mode={1}
            />
        </div>
    )
}

export default CalendarModal;