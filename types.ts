
export type SportType = 'all' | 'basketball' | 'badminton' | 'volleyball' | 'tennis' | 'soccer' | 'swimming' | 'fitness';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type ActivityStatus = 'upcoming' | 'ongoing' | 'completed';

export interface Activity {
  id: string;
  type: SportType;
  title: string;
  venue: string;
  location: string;
  level: SkillLevel;
  levelScore: number; // 1-10 級，數字越大程度越高
  date: string;
  time: string;
  duration: string;
  currentMembers: number;
  maxMembers: number;
  captain: {
    name: string;
    avatar: string;
    rating: number;
    sessionsHosted: number;
    tag?: string;
  };
  price: number;
  description: string;
  highlights: string[];
}

export interface RentalVenue {
  id: number;
  name: string;
  type: SportType;
  area: string;
  district: string;
  location: string;
  rating: number;
  verified: boolean;
  popular: boolean;
  pricePerHour: number;
  courts: number;
  description: string;
  facilities: string[];
  openHours: string;
  phone: string;
  images: string[];
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'captain';
  text: string;
  time: string;
}
