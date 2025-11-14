import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../layouts/Topbar";
import Bottombar from "../layouts/Bottombar";
import Modal from "../components/Modal";
import HospitalDetailBottomSheet from "../components/HospitalMap/HospitalDetailBottomSheet";
import hospitalImage from "../assets/hospitalmap/hospitalimage.png";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Hospital {
  id: number;
  lat: number;
  lng: number;
  image: string;
  name: string;
  department: string;
  address: string;
  hours: {
    day: string;
    startTime: string;
    endTime: string;
  };
  phone: string;
  isFavorite?: boolean;
}

// 샘플 병원 데이터
const HOSPITAL_DATA: Hospital[] = [
  {
    id: 1,
    lat: 37.5560379420754,
    lng: 126.924462416982,
    image: hospitalImage,
    name: "농인사랑병원",
    department: "외과·정형외과",
    address: "서울특별시 마포구 양화로 188 (동교동)",
    hours: { day: "월", startTime: "09:00", endTime: "18:00" },
    phone: "02-789-9800",
  },
  {
    id: 2,
    lat: 37.5553020767532,
    lng: 126.923590029183,
    image: hospitalImage,
    name: "마포의료센터",
    department: "내과·외과",
    address: "서울특별시 마포구 양화로 200",
    hours: { day: "월", startTime: "08:00", endTime: "19:00" },
    phone: "02-789-9801",
  },
  {
    id: 3,
    lat: 37.5545808852364,
    lng: 126.922708589618,
    image: hospitalImage,
    name: "동교병원",
    department: "정형외과",
    address: "서울특별시 마포구 양화로 180",
    hours: { day: "월", startTime: "09:30", endTime: "18:30" },
    phone: "02-789-9802",
  },
];

const Hospitalmap = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const mapRef = useRef<any>(null);

  // 지도 초기화 (한 번만)
  useEffect(() => {
    if (mapRef.current) return; // 이미 초기화됨

    const container = document.getElementById(`map`);
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.55561, 126.9234),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    // 마커 생성
    HOSPITAL_DATA.forEach((hospital) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(hospital.lat, hospital.lng),
        map: map,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, "click", () => {
        console.log("마커 클릭:", hospital.name);
        setSelectedHospital({
          ...hospital,
          isFavorite: favorites.has(hospital.id),
        });
      });
    });
  }, [favorites]);

  const handleFavoriteToggle = () => {
    if (selectedHospital) {
      const newFavorites = new Set(favorites);
      if (newFavorites.has(selectedHospital.id)) {
        newFavorites.delete(selectedHospital.id);
      } else {
        newFavorites.add(selectedHospital.id);
      }
      setFavorites(newFavorites);
      // selectedHospital의 isFavorite 상태 즉시 업데이트
      setSelectedHospital({
        ...selectedHospital,
        isFavorite: !selectedHospital.isFavorite,
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/*위치 권한 모달*/}
      <Modal
        isOpen={modalOpen}
        title="위치 정보 권한"
        description={
          <>
            <p>병원을 찾기 위해 위치 정보를 사용할게요.</p>
            <p>나중에 설정에서 바꿀 수 있어요.</p>
          </>
        }
        cancelButtonText="취소"
        confirmButtonText="허용"
        onCancel={() => setModalOpen(false)}
        onConfirm={() => {
          console.log('위치 권한이 승인되었습니다!');
          setModalOpen(false);
        }}
      />

      {/* Hospital Detail Bottom Sheet */}
      {selectedHospital && (
        <HospitalDetailBottomSheet
          isOpen={!!selectedHospital}
          onClose={() => setSelectedHospital(null)}
          hospital={selectedHospital}
          onFavoriteToggle={handleFavoriteToggle}
        />
      )}

      <Topbar showLogo={true} onStarClick={() => navigate('/favorite-hospitals')} />
      <div style={{ width: "360px", height: "50px", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "#1A1A1A", fontFamily: "Pretendard", marginLeft: "20px", marginRight: "20px", marginTop: "10px", marginBottom: "10px" }}>손빛이 닿는 병원을 찾아보세요</span>
      </div>
      <div id="map" style={{ width: "360px", height: "510px" }} />
      <Bottombar />
    </div>
  );
};

export default Hospitalmap;