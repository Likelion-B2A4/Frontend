export interface IOperatingTime {
  mon: string | null;
  tue: string | null;
  wed: string | null;
  thu: string | null;
  fri: string | null;
  sat: string | null;
  sun: string | null;
}

// 1. [보낼 때] 프론트 문자열 -> 백엔드 객체 변환
// (수정할 때 API로 보내는 용도)
export const transformOperatingData = (operatingTime: IOperatingTime) => {
  const operatingHours: any = {};
  const breakTimes: any = {};

  // 요일 매핑 (소문자 -> 대문자)
  const dayMapToUp: Record<string, string> = {
    mon: 'MON',
    tue: 'TUE',
    wed: 'WED',
    thu: 'THU',
    fri: 'FRI',
    sat: 'SAT',
    sun: 'SUN',
  };

  const SPLIT_TIME = ' ~ ';
  const SPLIT_BREAK = ' 휴게: ';

  Object.keys(operatingTime).forEach((key) => {
    const dayKey = key as keyof IOperatingTime;
    const rawTime = operatingTime[dayKey];
    const upperDay = dayMapToUp[dayKey];

    // 1. 휴무거나 데이터가 없는 경우
    if (!rawTime || rawTime === '휴무') {
      operatingHours[upperDay] = { isClosed: true };
      return;
    }

    // 2. 데이터 파싱
    try {
      let mainPart = rawTime;
      let breakPart = '';

      if (rawTime.includes(SPLIT_BREAK)) {
        [mainPart, breakPart] = rawTime.split(SPLIT_BREAK);
      }

      const clean = (str: string) => str.replace(/\s/g, '');
      const [openStr, closeStr] = mainPart.split(SPLIT_TIME);

      operatingHours[upperDay] = {
        openTime: clean(openStr),
        closeTime: clean(closeStr),
        isClosed: false,
      };

      // 휴게시간 처리
      if (breakPart) {
        const [breakStart, breakEnd] = breakPart.split(SPLIT_TIME);
        breakTimes[upperDay] = {
          breakStartTime: clean(breakStart),
          breakEndTime: clean(breakEnd),
        };
      }
    } catch (e) {
      console.error(`${upperDay} 파싱 에러:`, e);
      operatingHours[upperDay] = { isClosed: true };
    }
  });

  return { operatingHours, breakTimes };
};

// 2. ⭐️ [받을 때] 백엔드 배열 -> 프론트 문자열 변환 ⭐️
// (수정 페이지 들어갔을 때 데이터 채우는 용도)
// 중요: serverData가 '배열'로 들어옵니다!
export const reverseTransformOperatingData = (serverData: any[], serverBreak: any) => {
  // 초기값 (모두 null)
  const result: any = {
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
    sun: null,
  };

  // 요일 매핑 (대문자 -> 소문자)
  const dayMapToLow: Record<string, string> = {
    MON: 'mon',
    TUE: 'tue',
    WED: 'wed',
    THU: 'thu',
    FRI: 'fri',
    SAT: 'sat',
    SUN: 'sun',
  };

  // 배열이 아니거나 없으면 빈 객체 반환
  if (!serverData || !Array.isArray(serverData)) return result;

  serverData.forEach((info) => {
    const lowerKey = dayMapToLow[info.dayOfWeek];
    if (!lowerKey) return;

    // 휴무인 경우
    if (info.isClosed) {
      result[lowerKey] = '휴무';
      return;
    }

    // 시간 문자열 생성 (예: "09:00 ~ 18:00")
    let timeString = `${info.openTime} ~ ${info.closeTime}`;

    // 휴게 시간 확인 (배열 안에 같이 들어있는 경우)
    if (info.breakStartTime && info.breakEndTime) {
      timeString += ` 휴게: ${info.breakStartTime} ~ ${info.breakEndTime}`;
    }
    // 혹시 휴게시간이 별도 객체(serverBreak)로 들어오는 경우 (구버전 대응)
    else if (serverBreak && serverBreak[info.dayOfWeek]) {
      const brk = serverBreak[info.dayOfWeek];
      if (brk.breakStartTime && brk.breakEndTime) {
        timeString += ` 휴게: ${brk.breakStartTime} ~ ${brk.breakEndTime}`;
      }
    }

    result[lowerKey] = timeString;
  });

  return result;
};

// 3. [보여줄 때] 프로필 뷰용 변환 함수 (그대로 유지)
export interface ProcessedOperatingDay {
  day: string;
  hours: string;
  break: string | null;
}

const dayMapKR: Record<string, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

export const processOperatingTimeForDisplay = (
  serverOperatingHours: any[]
): ProcessedOperatingDay[] => {
  if (!serverOperatingHours || !Array.isArray(serverOperatingHours)) return [];

  return serverOperatingHours.map((dayInfo) => {
    const krDay = dayMapKR[dayInfo.dayOfWeek] || dayInfo.dayOfWeek;
    const isClosed = dayInfo.isClosed;

    const hours = isClosed ? '휴무' : `${dayInfo.openTime} - ${dayInfo.closeTime}`;
    let breakStr: string | null = null;

    if (!isClosed && dayInfo.breakStartTime && dayInfo.breakEndTime) {
      breakStr = `${dayInfo.breakStartTime} - ${dayInfo.breakEndTime} 휴게시간`;
    } else if (!isClosed) {
      breakStr = '휴게시간 없음';
    }

    return {
      day: krDay,
      hours: hours,
      break: breakStr,
    };
  });
};
