import { endOfMonth, startOfMonth, startOfWeek, format, addDays, isToday, isSameMonth, isSameDay, isPast, isFuture, isBefore } from "date-fns";

interface Props {
    currentDate : Date,
    selectedMonth : string,
    selectedDay : string,
    onDateClick : (day: Date) => void,
    mode: number
}

const CalendarCells = ({currentDate, selectedMonth, selectedDay, onDateClick, mode = 0} : Props) => {
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

            days.push(
                <div 
                    key={num} 
                    className={`w-full h-[52px] text-center
                        ${isOtherMonth ? "opacity-0" : `${textColor} cursor-pointer`}
                        
                    `}
                    onClick={() => {onDateClick(cloneDay)}}
                >
                    {format(day, 'd')}
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