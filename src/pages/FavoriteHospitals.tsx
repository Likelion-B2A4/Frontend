import { useState, useEffect } from "react";
import Topbar from "../layouts/Topbar";
import Bottombar from "../layouts/Bottombar";
import HospitalFavoriteContent from "../components/HospitalMap/HospitalFavoriteContent";
import HospitalIamge from '../assets/hospitalmap/hospitalimage.png';

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
}

const HOSPITAL_DATA: Hospital[] = [
  {
    id: 1,
    lat: 37.5560379420754,
    lng: 126.924462416982,
    image: HospitalIamge,
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
    image: HospitalIamge,
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
    image: HospitalIamge,
    name: "동교병원",
    department: "정형외과",
    address: "서울특별시 마포구 양화로 180",
    hours: { day: "월", startTime: "09:30", endTime: "18:30" },
    phone: "02-789-9802",
  },
];

const FavoriteHospitals = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 2]));

  // localStorage에서 즐겨찾기 불러오기
  useEffect(() => {
    const savedFavorites = localStorage.getItem('hospitalFavorites');
    if (savedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }
  }, []);

  // 즐겨찾기 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('hospitalFavorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const handleRemoveFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    newFavorites.delete(id);
    setFavorites(newFavorites);
  };

  const favoriteHospitals = HOSPITAL_DATA.filter(hospital => favorites.has(hospital.id));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Topbar type="header" title="즐겨찾기" />

      <div style={{
        width: "360px",
        overflowY: "auto",
        padding: "16px 0"
      }}>
        {favoriteHospitals.length === 0 ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#999',
            fontSize: '14px'
          }}>
            즐겨찾기 병원이 없습니다.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
            {favoriteHospitals.map((hospital) => (
              <div key={hospital.id}>
                <HospitalFavoriteContent
                  image={hospital.image}
                  name={hospital.name}
                  department={hospital.department}
                  address={hospital.address}
                  hours={hospital.hours}
                  phone={hospital.phone}
                  isFavorite={true}
                  onFavoriteToggle={() => handleRemoveFavorite(hospital.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Bottombar />
    </div>
  );
};

export default FavoriteHospitals;
