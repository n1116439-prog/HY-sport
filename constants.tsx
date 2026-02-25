
import { Activity, SportType, RentalVenue } from './types';

export const SPORT_ICONS: Record<string, string> = {
  basketball: '🏀',
  badminton: '🏸',
  volleyball: '🏐',
  tennis: '🎾',
  soccer: '⚽',
  swimming: '🏊‍♂️',
  fitness: '💪',
  all: '🌟'
};

export const SPORT_LABELS: Record<string, string> = {
  basketball: '籃球',
  badminton: '羽球',
  volleyball: '排球',
  tennis: '網球',
  soccer: '足球',
  swimming: '游泳',
  fitness: '健身',
  all: '全部'
};

export const LEVEL_LABELS: Record<string, string> = {
  beginner: '初階',
  intermediate: '中階',
  advanced: '進階'
};

export const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700'
};

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'basketball',
    title: '週末籃球友誼賽',
    venue: '大安運動中心',
    location: '台北市大安區辛亥路三段 55 號 B1',
    level: 'beginner',
    levelScore: 2,
    date: '明天',
    time: '14:00-16:00',
    duration: '2 小時',
    currentMembers: 6,
    maxMembers: 10,
    captain: {
      name: 'Kevin',
      avatar: '👨',
      rating: 4.8,
      sessionsHosted: 89,
      tag: '資深隊長'
    },
    price: 150,
    description: '週末來打球！歡迎初學者和有經驗的球友一起來。',
    highlights: ['提供飲水', '有更衣室', '請自備球鞋']
  },
  {
    id: '2',
    type: 'badminton',
    title: '羽球雙打練習',
    venue: '信義國小體育館',
    location: '台北市信義區松勤路 60 號',
    level: 'intermediate',
    levelScore: 5,
    date: '週六',
    time: '19:00-20:30',
    duration: '1.5 小時',
    currentMembers: 3,
    maxMembers: 4,
    captain: {
      name: 'Amy',
      avatar: '👩',
      rating: 4.9,
      sessionsHosted: 112
    },
    price: 200,
    description: '固定徵人，球友程度穩定，包含球場租借與球。',
    highlights: ['含球費', '近捷運站']
  },
  {
    id: '3',
    type: 'volleyball',
    title: '排球六排友誼賽',
    venue: '中正運動中心',
    location: '台北市中正區信義路一段1號',
    level: 'intermediate',
    levelScore: 4,
    date: '後天',
    time: '18:00-21:00',
    duration: '3 小時',
    currentMembers: 10,
    maxMembers: 12,
    captain: {
      name: 'Jason',
      avatar: '🏐',
      rating: 4.7,
      sessionsHosted: 45
    },
    price: 250,
    description: '歡迎有基礎的球友一起來玩，流流汗。',
    highlights: ['分組對抗', '專業排球場']
  },
  {
    id: '4',
    type: 'badminton',
    title: '羽球中階暢打',
    venue: '松山運動中心',
    location: '台北市松山區敦化北路1號',
    level: 'intermediate',
    levelScore: 6,
    date: '下週一',
    time: '20:00-22:00',
    duration: '2 小時',
    currentMembers: 8,
    maxMembers: 16,
    captain: {
      name: '王小明',
      avatar: '🏸',
      rating: 4.9,
      sessionsHosted: 210
    },
    price: 300,
    description: '程度約在 6 級左右，謝絕純新手，感謝配合。',
    highlights: ['多場地', '專業級用球']
  },
  {
    id: '5',
    type: 'tennis',
    title: '網球雙打對抗',
    venue: '彩虹河濱公園網球場',
    location: '台北市內湖區堤頂大道一段',
    level: 'advanced',
    levelScore: 8,
    date: '下週六',
    time: '08:00-10:00',
    duration: '2 小時',
    currentMembers: 2,
    maxMembers: 4,
    captain: {
      name: '老張',
      avatar: '🎾',
      rating: 4.5,
      sessionsHosted: 32
    },
    price: 100,
    description: '尋找程度相當的對手進行比賽。',
    highlights: ['河濱美景', '空氣好']
  }
];

export const MOCK_RENTAL_VENUES: RentalVenue[] = [
  {
    id: 1,
    name: '信義運動中心羽球場',
    type: 'badminton',
    area: 'taipei',
    district: 'xinyi',
    location: '台北市信義區松勤街100號',
    rating: 4.8,
    verified: true,
    popular: true,
    pricePerHour: 400,
    courts: 8,
    description: '專業羽球場地，設備新穎，交通便利',
    facilities: ['冷氣', '淋浴間', '停車場', '器材租借', 'WiFi'],
    openHours: '06:00-23:00',
    phone: '02-2723-4567',
    images: ['🏸', '🏟️']
  }
];
