import WebTopbar from "../layouts/WebTopbar";
import hospitalImg from "../assets/webTopbar/hospital-plus.svg";
import DoctorList from "../components/Doctor/DoctorList";
import AddDoctor from "../components/Doctor/AddDoctor";

const SelectDoctor = () => {
    return (
        <div>
            <WebTopbar text="농민사랑병원" text_img={hospitalImg}/>
            <div className="flex justify-center items-center mt-[122px]">
                <DoctorList />
                {/* <AddDoctor /> */}
            </div>
        </div>
    )
}

export default SelectDoctor;

// const SelectDoctor = () => {
//     return (
//         <div className="h-screen flex flex-col"> 
//             <WebTopbar text="농민사랑병원" text_img={hospitalImg}/>
            
//             {/* 2. 내용 영역: 남은 공간 모두 차지 (flex-1) 및 스크롤 방지 (overflow-y-hidden) */}
//             <div className="flex-1 w-fit overflow-y-hidden flex justify-center items-center">
//                 <DoctorList />
//                 {/* <AddDoctor /> */}
//             </div>
//         </div>
//     )
// }

// export default SelectDoctor;