import { useEffect } from "react";
import Topbar from "../layouts/Topbar";
import Bottombar from "../layouts/Bottombar";

declare global {
  interface Window {
    kakao: any;
  }
}

const Hospitalmap = () => {
  useEffect(() => {
    let container = document.getElementById(`map`); // 지도를 담을 영역의 DOM 레퍼런스
    let options = {
      center: new window.kakao.maps.LatLng(37.55561, 126.9234), // 지도 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Topbar showLogo={true} />
      <div style={{ width: "360px", height: "50px", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "#1A1A1A", fontFamily: "Pretendard", marginLeft: "20px", marginRight: "20px", marginTop: "10px", marginBottom: "10px" }}>손빛이 닿는 병원을 찾아보세요</span>
      </div>
      <div id="map" style={{ width: "360px", height: "510px" }} />
      <Bottombar />
    </div>
  );
};

export default Hospitalmap;