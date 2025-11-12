import searchImg from "../../assets/doctor/search.svg";
import addImg from "../../assets/doctor/add_doctor.svg";
import { useState } from "react";

export interface mockData {
    doctorId: number;
    name: string;
    specialty: string;
}

const DoctorList = () => {
    const [name, setName] = useState("");
    const [selectDocId, setSelectDocId] = useState<number | null>(null);

    const data = [
        {
            "doctorId": 1,
            "name": "의사1", 
            "specialty" : "이비인후과"
        },
        {
            "doctorId": 2,
            "name": "의사2", 
            "specialty" : "이비인후과"
        },
        {
            "doctorId": 3,
            "name": "의사3", 
            "specialty" : "피부과"
        },
        {
            "doctorId": 4,
            "name": "의사4", 
            "specialty" : "내과"
        },
        
    ];

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        console.log(name);
    }

    const handleInput = (e: React.MouseEvent<HTMLImageElement>) => {
        console.log(name, "클릭")
    }

    const onClickList = (id: number) => {
        setSelectDocId(id);
    }

    const isButtonActive = selectDocId !== null;
    
    return (
        <div className="w-[400px] mx-auto flex flex-col gap-8 justify-center items-center">
            <div className="text-[24px] font-semibold text-[#343841] tracking-tighter">
                의사를 선택해 진료를 시작하세요
            </div>

            <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-row items-center relative">
                        <input 
                            type="text" 
                            placeholder="검색어를 입력하세요"
                            onChange={onChangeInput}
                            value={name}
                            className="w-[360px] h-12 pl-2 border border-b-[#A9ACB2] border-x-0 border-t-0"
                        />
                        <img 
                            src={searchImg} 
                            alt="search" 
                            onClick={handleInput}
                            className="w-6 h-6 absolute right-4 cursor-pointer"/>
                    </div>
                    <div className="flex justify-center items-center">
                        <img src={addImg} alt="add_doctor" className="cursor-pointer" />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {data.length === 0 ? (
                        <div className="flex flex-col h-[350px] justify-center items-center">
                            <p className="text-[16px] text-[#666B76]">의사를 추가해주세요.</p>
                        </div>
                    ) : (
                    <div className="flex flex-col h-[350px] overflow-y-scroll">
                        {data.map((doctor) => {
                            const isCurrentDoctorSelected = doctor.doctorId === selectDocId;
                            return (
                            <div key={doctor.doctorId} onClick={() => onClickList(doctor.doctorId)} className={`w-full h-[120px] p-4 hover:bg-[#F4F6F8] ${isCurrentDoctorSelected ? 'bg-[#F4F6F8]' : ''}`}>
                                <div className="flex flex-row gap-[23px] items-center">
                                    <div className="w-22 h-22 rounded-full bg-[#F4F6F8] flex flex-col items-center content-center justify-center">
                                        <img src="/camera.svg" alt="카메라 아이콘" className="w-6" />
                                    </div>

                                    <div className="flex flex-col justify-center h-fit gap-1">
                                        <div className="flex flex-row items-end gap-2">
                                            <div className="text-[#343841] font-semibold text-[20px]">{doctor.name}</div>
                                            <div className="text-[#666B76] text-[12px] font-medium ">{doctor.specialty}</div>
                                        </div>

                                        <div className="flex flex-row gap-1 text-[#666B76] text-[12px] font-medium">
                                            <p>최근 진료</p>
                                            <p>10월 10일 09:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    )}

                    <div>
                        <button 
                            className={`w-full h-14 rounded-xl text-[20px] font-semibold 
                            ${isButtonActive ? 'bg-[#3D84FF] text-white' : 'bg-[#F4F6F8] text-[#A9ACB2]'}`}
                            
                        >
                            확인
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default DoctorList;