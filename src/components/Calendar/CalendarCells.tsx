import { endOfMonth, startOfMonth, startOfWeek, format, addDays, isSameMonth, isSameDay, isBefore } from "date-fns";
import recordImg from "../../assets/calendar/record.svg";
import med_notAll from "../../assets/calendar/med_notall.svg";
import med_All from "../../assets/calendar/med_all.svg";

interface Props {
    currentDate : Date,
    selectedMonth : string,
    selectedDay : string,
    onDateClick : (day: Date) => void,
    mode: number,
    calendarMedData: Record<string, {hasMed: boolean}>
}

const CalendarCells = ({currentDate, selectedMonth, selectedDay, onDateClick, mode = 0, calendarMedData} : Props) => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);

    const startDate = startOfWeek(monthStart);
    const endDate = startOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    let num = 0;
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, "yyyy-MM-dd");
            const cloneDay = day;
            num++;

            const isSelected = 
                selectedMonth === format(cloneDay, "MM") &&
                selectedDay === format(cloneDay, "dd") &&
                isSameMonth(cloneDay, currentDate);

            let textColor = "";
            if (isSameDay(cloneDay, currentDate)) { // 오늘
                textColor = "text-[#0C58FF]"
            } else if (isBefore(cloneDay, currentDate)) {
                textColor = "text-black";
            } else {
                if (mode == 1) textColor = "text-black";
                else textColor = "text-[#A9ACB2]"
            }

    

            const isOtherMonth = format(currentDate, "M") !== format(cloneDay, "M");

            const medStatus = calendarMedData[formattedDate] || {hasMed: false};
            const hasRecord = true;

            days.push(
                <div 
                    key={num} 
                    className={`w-full h-[52px] text-center
                        ${isOtherMonth ? "opacity-0" : `${textColor} cursor-pointer`}
                    `}
                    onClick={() => {onDateClick(cloneDay)}}
                >
                    {format(day, 'd')}
                    <div className="flex flex-row gap-0.5 mx-[5px] justify-center">
                        {hasRecord && <img src={recordImg} alt="" />}
                        {medStatus.hasMed && <img src={med_All} alt="" />}
                    </div>
                </div>
            )
            day = addDays(day, 1);
        }
        rows.push(
            <div className="flex w-full gap-1" key={num}>
                {days}
            </div>
        )
        days = []
    }

    return (
        <div className="flex flex-col items-center justify-between w-full">
            {rows}
        </div>
    )
}

export default CalendarCells;
