import WebTopbar from "../layouts/WebTopbar";
import hospitalImg from "../assets/webTopbar/hospital-plus.svg";
import DoctorList from "../components/Doctor/DoctorList";

const SelectDoctor = () => {
    return (
        <div>
            <WebTopbar text="농민사랑병원" text_img={hospitalImg}/>
            <div className="flex justify-center items-center mt-[122px]">
                <DoctorList />
            </div>
        </div>
    )
}

export default SelectDoctor;