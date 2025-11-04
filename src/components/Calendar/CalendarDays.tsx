const CalendarDays = () => {
    const date = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <div className="flex items-center justify-between">
            {date.map((day: string) => (
                <div key={day} className="w-full">
                    <div className="flex justify-center text-[#A9ACB2]">
                        {day}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CalendarDays;