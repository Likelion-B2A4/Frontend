const AddDoctor = () => {
    return (
        <div className="flex flex-col w-[688px] mx-auto border border-black">
            <div className="flex justify-center items-center">
                <p>등록할 의사 정보를 입력해주세요</p>
            </div>

            <div className="flex flex-col gap-[120px]">
                <div className="flex flex-row gap-20">
                    <div className="w-52 h-52 border border-black">
                        <img src="" alt="" />
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row gap-4">
                            <div className="w-48 h-12">
                                <p>이름</p>
                                <input type="text" className="w-full border border-t-0 border-x-0"/>
                            </div>
                            
                            <div className="w-48 h-12">
                                <p>진료 과목</p>
                                <input type="text" />
                            </div>
                        </div>

                        <div className="w-full">
                            <p>의사 암호</p>
                            <input type="text" />
                            <p>영문, 숫자 포함 8자 이상</p>
                        </div>
                    </div>
                </div>

                <div>
                    <button>등록</button>
                </div>
            </div>
        </div>
    )
}

export default AddDoctor