import Logo from "../components/TypoLogo";
import logoutImg from "../assets/webTopbar/logout.svg";
import doctorReselectImg from "../assets/webTopbar/doctor-reselect.svg";
import { useNavigate } from "react-router-dom";

interface Props {
    text?: string;
    text_img ?: string;
    showDoctorReselect?: boolean;
    onDoctorReselectClick?: () => void;
}

const WebTopbar = ({text , text_img, showDoctorReselect, onDoctorReselectClick } : Props) => {
    const navigate = useNavigate();

    const handleDoctorReselectClick = () => {
        if (onDoctorReselectClick) {
            onDoctorReselectClick();
        }
        navigate('/select-doctor');
    };
    return (
        <div className="fixed top-0 w-full py-8 px-32">
            <div className="flex flex-row justify-between w-full">
                <div>
                    <Logo />
                </div>

                <div className="flex flex-row justify-center items-center gap-8 font-semibold text-[14px]">
                    {(text || text_img) && (
                        <div className="flex flex-row gap-2 items-center">
                            <p className="text-[#343841]">{text}</p>
                            <img src={text_img} alt="" className="w-6 h-6" />
                        </div>
                    )}

                    {showDoctorReselect && (
                        <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={handleDoctorReselectClick}>
                            <p className="text-[#343841]">의사 재선택</p>
                            <img src={doctorReselectImg} alt="doctor-reselect" className="w-6 h-6" />
                        </div>
                    )}

                    <div className="flex flex-row gap-2 items-center" style={{ marginRight: showDoctorReselect ? "36px" : "0" }}>
                        <p className="text-[#666B76]">로그아웃</p>
                        <img src={logoutImg} alt="logout" className="w-6 h-6" />
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default WebTopbar;
