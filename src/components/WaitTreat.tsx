import waitImg from "../assets/waiting.svg";

const WaitTreat = () => {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="flex flex-col gap-[73px] items-center">
                <div>
                    <img src={waitImg} alt="wait" />
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="font-semibold text-[20px] text-[#343841]">
                        진료를 받고 있어요
                    </div>

                    <div className="flex flex-col justify-center items-center font-medium text-[14px] text-[#666B76]">
                        <p>의사가 진료 완료를 누르면</p>
                        <p>자동으로 진료 기록이 전송돼요</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitTreat;