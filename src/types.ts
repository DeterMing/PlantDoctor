export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: { day: string; temp: number; icon: string }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'care' | 'weather' | 'system';
  timestamp: string;
}

export interface DiagnosticReport {
  id: string;
  date: string;
  diagnosis: string;
  status: string;
  summary: string;
  details: {
    causes: { title: string; items: string[] }[];
    actions: string[];
  };
  notes?: string;
  image?: string;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  status: 'Xanh tốt' | 'Cần nước' | 'Ổn định' | 'Nguy kịch' | 'Đang theo dõi';
  nextCare: string;
  careType: 'Tưới nước' | 'Bón phân' | 'Thay đất' | 'Cắt tỉa';
  location: string;
  lastAnalysis?: string;
  reports?: DiagnosticReport[];
}

export interface CareTask {
  id: string;
  plantId: string;
  plantName: string;
  type: 'Tưới nước' | 'Bón phân' | 'Cắt tỉa' | 'Thay chậu';
  due: string;
  overdue?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'Cây cảnh' | 'Phân bón' | 'Đất trồng' | 'Chậu cây' | 'Dụng cụ';
  price: number;
  image: string;
  rating: number;
  reviews: number;
  tag?: string;
  description: string;
  region?: 'Bắc' | 'Trung' | 'Nam';
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  timestamp: string;
  tag?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface NearbyMember {
  id: string;
  name: string;
  avatar: string;
  distanceKm: number;
  area: string;
  lat: number;
  lng: number;
  online: boolean;
  plants: string[];
  support: 'Tư vấn online' | 'Ghé thăm trực tiếp';
}
