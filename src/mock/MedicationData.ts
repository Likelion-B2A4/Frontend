// src/mock/mockMedicationData.ts (예시 경로)

export const mockMedicationData: Record<string, { hasMed: boolean }> = {
    // 11월 (현재 날짜는 2025-11-16이라고 가정)
    "2025-11-01": { hasMed: true },
    "2025-11-02": { hasMed: false },
    "2025-11-03": { hasMed: false },
    "2025-11-04": { hasMed: false },
    "2025-11-05": { hasMed: true },
    "2025-11-06": { hasMed: false },
    "2025-11-07": { hasMed: false },
    "2025-11-08": { hasMed: true },
    "2025-11-09": { hasMed: true },
    "2025-11-10": { hasMed: true },
    "2025-11-11": { hasMed: false },
    "2025-11-12": { hasMed: true },
    "2025-11-13": { hasMed: true },
    "2025-11-14": { hasMed: true },
    "2025-11-15": { hasMed: true },
    "2025-11-16": { hasMed: false }, 
    "2025-11-17": { hasMed: false }, 
    "2025-10-26": { hasMed: false }, 
};

// DailyRecord에서 사용할 상세 목데이터 구조 (참고용)
export const mockDailyRecord = [
    {
      "recordId": 12,
      "name": "감기약",
      "startDate": "2025-10-10",
      "endDate": "2025-10-20",
      "alarmEnabled": true,
      "daysOfWeek": ["MON", "WED", "FRI"],
      "schedules": [
        {
          "scheduleId": 41,
          "period": "morning",
          "time": "07:00", 
          "enabled": true
        },
        {
          "scheduleId": 43,
          "period": "bedtime",
          "time": "22:00",
          "enabled": true
        }
      ]
    },
    {
      "recordId": 15,
      "name": "소화제",
      "startDate": "2025-10-05",
      "endDate": "2025-10-25",
      "alarmEnabled": false,
      "daysOfWeek": ["MON", "WED"],
      "schedules": [
        {
          "scheduleId": 50,
          "period": "lunch",
          "time": "12:30",
          "enabled": true
        }
      ]
    }
    
];

// 요일 이름을 인덱스로 변환하는 헬퍼 함수
export const dayMap: Record<string, number> = {
    "MON": 0, "TUE": 1, "WED": 2, "THU": 3, "FRI": 4, "SAT": 5, "SUN": 6
};

// 특정 달 진료 이력 날짜
export const mockMedicalTreatment = {
  "year": 2025,
  "month": 10,
  "dates": [
    "2025-11-03",
    "2025-11-11",
    "2025-11-17"
  ]
}