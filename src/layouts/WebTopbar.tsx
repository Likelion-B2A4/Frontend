import Logo from "../components/TypoLogo";
import logoutImg from "../assets/webTopbar/logout.svg";

interface Props {
    text?: string;
    text_img ?: string;
}

const WebTopbar = ({text , text_img } : Props) => {
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

                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-[#666B76]">로그아웃</p>
                        <img src={logoutImg} alt="logout" className="w-6 h-6" />
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default WebTopbar;
