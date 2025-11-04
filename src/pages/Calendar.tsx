import { addMonths, format, subMonths, add } from "date-fns";
import Topbar from "../layouts/Topbar";
import CalendarDays from "../components/Calendar/CalendarDays";
import CalendarCells from "../components/Calendar/CalendarCells";
import Bottombar from "../layouts/Bottombar";
import DailyRecord from "../components/Calendar/DailyRecord";

const Calendar = () => {
    const currentDate = new Date();
    const formatDate = format(currentDate, "yyyy-MM-dd");
    //console.log(formatDate);



    return (
        
    <div className="flex flex-col min-h-screen">
        <Topbar title="진료 기록"/>
        <div className="flex flex-col mx-[20px] gap-[8px]">
            <CalendarDays />
            <CalendarCells currentDate={currentDate}/>
            <DailyRecord />
        </div>
        

    </div> 
        
    )
}

export default Calendar;