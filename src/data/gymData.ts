import studentGymImg from '../assets/images/korean_student_funfun_gym_1791990881160.jpg';
import heroFunFunImg from '../assets/images/hero_funfun_boxing_korean_1791985384719.jpg';
import heavyBagsImg from '../assets/images/funfun_boxing_heavy_bags_1791987345466.jpg';
import boxingGlovesImg from '../assets/images/gallery_boxing_gloves_ring_1791984329116.jpg';

export interface ProgramItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  target: string;
  description: string;
  features: string[];
  recommendedFor: string;
  image: string;
  badge: string;
}

export interface PricingItem {
  id: string;
  name: string;
  period: string;
  priceNote: string;
  isPopular?: boolean;
  features: string[];
  target: string;
}

export interface FacilityPhoto {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  isReference: boolean;
}

export interface GymSettings {
  brandNameKo: string;
  brandNameEn: string;
  slogan: string;
  subSlogan: string;
  phone: string;
  address: string;
  addressDetail: string;
  transitInfo: string;
  parkingInfo: string;
  weekdayHours: string;
  saturdayHours: string;
  sundayHolidayHours: string;
  mapServiceUrl: string;
  isCustomized: boolean;
}

export const INITIAL_GYM_SETTINGS: GymSettings = {
  brandNameKo: '펀펀 복싱',
  brandNameEn: 'FUN FUN BOXING',
  slogan: '복싱, 어렵지 않아요. 즐겁게 시작하는 펀펀 복싱!',
  subSlogan: '운동 초보자부터 다이어트, 체력 관리까지. 나에게 맞는 속도로 즐겁게 시작해 보세요.',
  phone: '상담 전화번호 등록 예정 (운영자 설정 가능)',
  address: '주소 입력 예정 (운영자 설정 가능)',
  addressDetail: '상세 위치는 정식 오픈 또는 지점 확정 후 안내됩니다.',
  transitInfo: '지하철역 및 버스정류장 연계 정보 입력 예정',
  parkingInfo: '건물 내 주차 가능 여부 및 인근 공영주차장 안내 예정',
  weekdayHours: '평일 10:00 ~ 23:00 (예정)',
  saturdayHours: '토요일 11:00 ~ 18:00 (예정)',
  sundayHolidayHours: '일요일 및 공휴일 휴무',
  mapServiceUrl: '',
  isCustomized: false,
};

export const INITIAL_PROGRAMS: ProgramItem[] = [
  {
    id: 'intro',
    code: 'PROGRAM A',
    title: '입문 복싱',
    subtitle: 'Boxing Basics & Step',
    target: '복싱을 처음 접하는 운동 초보자',
    description: '어색하고 긴장되는 첫 복싱! 기본 자세, 스텝, 잽과 스트레이트 등 기초 동작부터 단계별로 차근차근 익혀나가는 친절한 입문 클래스입니다.',
    features: [
      '복싱 기본 가드 자세와 밸런스 스텝',
      '기초 펀치 (잽, 원투, 바디) 메커니즘',
      '체력 부담 없는 단계별 맞춤 강도 지도',
      '1:1 기본기 교정 및 올바른 폼 지도'
    ],
    recommendedFor: '운동 경험이 없거나 헬스장이 지루했던 초보자',
    image: studentGymImg,
    badge: '초보자 추천'
  },
  {
    id: 'diet',
    code: 'PROGRAM B',
    title: '다이어트 복싱',
    subtitle: 'Boxing Cardio & Interval',
    target: '칼로리 소모와 체중 감량을 원하는 분',
    description: '신나는 샌드백 타격과 유산소 서킷 트레이닝을 결합하여 지루할 틈 없이 체지방을 태우고 탄력 있는 몸매를 완성하는 프로그램입니다.',
    features: [
      '복싱 동작과 서킷 유산소의 조화',
      '개인별 체력 수준에 맞춘 점진적 인터벌',
      '꾸준한 운동 습관 형성을 위한 동기부여',
      '상체·코어·하체를 골고루 사용하는 전신 운동'
    ],
    recommendedFor: '체중 감량과 활력 넘치는 라인을 원하는 분',
    image: heroFunFunImg,
    badge: '인기 프로그램'
  },
  {
    id: 'stress',
    code: 'PROGRAM C',
    title: '직장인 스트레스 케어',
    subtitle: 'After-Work Energy Reset',
    target: '퇴근 후 스트레스 해소와 체력 회복이 필요한 직장인',
    description: '하루 동안 쌓인 피로와 스트레스를 시원하게 샌드백을 치며 털어내는 시간. 퇴근 후 리프레시와 함께 일상의 활력을 되찾아 드립니다.',
    features: [
      '스트레스 해소에 특화된 타격 콤비네이션',
      '경직된 어깨와 허리를 풀어주는 동적 스트레칭',
      '바쁜 일정을 고려한 탄력적 운동 스케줄',
      '운동 경험치에 맞춘 부담 없는 수업 진행'
    ],
    recommendedFor: '업무 스트레스 해소와 체력 방전을 막고 싶은 직장인',
    image: heavyBagsImg,
    badge: '퇴근 후 힐링'
  },
  {
    id: 'youth',
    code: 'PROGRAM D',
    title: '청소년 체력 복싱',
    subtitle: 'Youth Fitness & Confidence',
    target: '성장기 체력과 자신감, 올바른 체형이 필요한 학생',
    description: '안전을 최우선으로 하여 올바른 신체 밸런스와 협응력, 체력을 다집니다. 에너지를 건강하게 발산하며 학업 집중력과 자신감을 키웁니다.',
    features: [
      '기초 체력 및 유연성, 순발력 협응 훈련',
      '안전 규칙과 바른 운동 자세를 중시하는 지도',
      '신체 균형 및 올바른 자세 형성 지원',
      '건전한 에너지 발산과 자신감 향상'
    ],
    recommendedFor: '학업 피로가 많고 체력 보강이 필요한 청소년',
    image: boxingGlovesImg,
    badge: '성장기 맞춤'
  }
];

export const INITIAL_PRICING: PricingItem[] = [
  {
    id: '1month',
    name: '1개월 이용권',
    period: '1개월 (주 5일 자율 이용)',
    priceNote: '상담 후 안내 (지점 및 프로모션별 상이)',
    features: [
      '복싱 전용 시설 및 웨이트 존 상시 이용',
      '기초 동작 지도 및 트레이닝 세션',
      '락커 및 샤워 시설 이용 포함',
      '개인 운동복 및 글러브 보관함 제공'
    ],
    target: '복싱을 가볍게 시작하고 체험해보고 싶은 분'
  },
  {
    id: '3month',
    name: '3개월 정기권',
    period: '3개월 (꾸준한 습관 형성)',
    priceNote: '상담 후 안내 (기간 등록 혜택 제공)',
    isPopular: true,
    features: [
      '1개월권 전체 혜택 포함',
      '정기 체력 및 체형 변화 점검',
      '입문용 핸드랩 및 입관 패키지 지원 상담',
      '프로그램 간 교차 수강 지원'
    ],
    target: '꾸준한 운동 습관과 확실한 체력 변화를 원하는 분'
  },
  {
    id: 'pt',
    name: '1:1 개인 레슨 (P.T)',
    period: '10회 / 20회 / 30회 선택형',
    priceNote: '목표 맞춤 상담 후 안내',
    features: [
      '전담 코치의 1:1 밀착 미트 트레이닝',
      '개인별 체형 및 관절 상태 맞춤형 루틴',
      '자세 집중 교정 및 심화 테크닉 코칭',
      '식단 및 라이프스타일 피드백'
    ],
    target: '단기간 집중 다이어트 또는 디테일한 기술 습득 희망자'
  },
  {
    id: 'custom',
    name: '기타 운영 프로그램',
    period: '주말반 / 학생 특별반 / 쿠폰권',
    priceNote: '맞춤 일정 상담',
    features: [
      '일정이 불규칙한 분을 위한 횟수권/쿠폰제',
      '방학 시즌 청소년 특강 프로그램',
      '소그룹 그룹 트레이닝(2~4인)',
      '기업 및 단체 제휴 문의 가능'
    ],
    target: '스케줄 맞춤형 운동이 필요한 회원'
  }
];

export const INITIAL_GALLERY: FacilityPhoto[] = [
  {
    id: 'f1',
    title: '정규 규격 복싱 링',
    category: '링 & 스파링 공간',
    description: '안전 패딩과 쾌적한 캔버스가 완비된 실전 및 테크닉 트레이닝 링 공간입니다.',
    image: boxingGlovesImg,
    isReference: true
  },
  {
    id: 'f2',
    title: '헤비백 & 샌드백 라인',
    category: '타격 훈련 존',
    description: '무게별, 용도별로 정돈된 샌드백 존에서 자유롭게 타격 및 스트레스 해소가 가능합니다.',
    image: heavyBagsImg,
    isReference: true
  },
  {
    id: 'f3',
    title: '1:1 패드워크 트레이닝 공간',
    category: '미트 & 코칭 존',
    description: '코치와 회원이 호흡을 맞추며 기본기와 콤비네이션을 연마하는 넓고 쾌적한 트레이닝 바닥입니다.',
    image: studentGymImg,
    isReference: true
  },
  {
    id: 'f4',
    title: '자연 채광과 환기가 우수한 메인 홀',
    category: '트레이닝 메인홀',
    description: '답답한 지하가 아닌 쾌적한 환기 및 조명 시설로 운동에만 몰입할 수 있는 환경입니다.',
    image: heroFunFunImg,
    isReference: true
  }
];
