import { endOfMonth, startOfMonth, startOfWeek, format, addDays, isToday, isSameMonth, isSameDay, isPast, isFuture, isBefore } from "date-fns";

interface Props {
    currentDate : Date,
}

const CalendarCells = ({currentDate} : Props) => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    console.log(monthStart, monthEnd); // 11월 1일 - 30일

    const startDate = startOfWeek(monthStart);
    const endDate = startOfWeek(monthEnd);
    console.log(startDate); // 10월 26일 일요일
    console.log(endDate); // 11월 30일 일요일


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

            let textColor = "";
            if (isSameDay(cloneDay, currentDate)) { // 오늘
                textColor = "text-[#0C58FF]"
            } else if (isBefore(cloneDay, currentDate)) {
                textColor = "text-black";
            } else {
                textColor = "text-[#A9ACB2]"
            }

            const isOtherMonth = format(currentDate, "M") !== format(cloneDay, "M");

            days.push(
                <div 
                    key={num} 
                    className={`w-full h-[52px] text-center
                        ${isOtherMonth ? "opacity-0" : `${textColor} cursor-pointer`}
                    `}
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