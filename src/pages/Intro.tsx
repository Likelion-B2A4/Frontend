const Intro = () => {
  return (
    <div className="flex h-screen flex-col justify-center content-center items-center">
      <div className="flex flex-row items-center p-[48px]">
        <img src="/mobile_disabled.svg" alt="disabled logo" />
        <img src="/web_activate.svg" alt="active logo" />
      </div>
      <div>태블릿/웹은 의사용이에요</div>
      <div>농인은 모바일을 사용해주세요</div>
    </div>
  );
};
export default Intro;
