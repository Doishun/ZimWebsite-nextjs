import React from "react";

// ============================================
// Type Definitions
// ============================================

// type vs interface の使い分け学習
// type: union types、プリミティブ型に適している
export type TourType = "safari" | "victoria-falls" | "bridge" | "flight" | "water" | "cultural";
export type FilterType = "all" | TourType;

// ============================================
// Database Tour (Supabaseから返される型)
// ============================================
export interface DatabaseTour {
  id: number;
  title: string;
  description: string;
  detail: string;
  price: string;
  duration: string;
  age: string;
  type: string;
  category: string;
  image: string;
  note: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================
// Tour (アプリケーション内で使用する型)
// ============================================
export interface Tour {
  id: number;
  title: string;
  description: string;      // 短い説明（カード表示用）
  detail: string;           // 詳細説明（詳細ページ用）
  price: string;            // "$27" or "$113~$166"
  duration: string;         // "2 hours" or "30 minutes"
  age: string;              // "All ages" or "14 years and above"
  type: TourType;           // safari | bridge | flight | water | cultural
  category: string;         // "Safari & Victoria Falls" など
  image: string;            // "/images/tours/xxx.jpg"
  note?: string;            // オプション：特記事項
  created_at: string;
  updated_at: string;
}

// ============================================
// Category（カテゴリー情報）
// ============================================
export interface Category {
  id: string;               // "safari", "bridge" など
  name: string;             // "Safari Adventures"
  icon: string;             // "🦁"
  type: TourType;           // type と紐づけ
  description: string;      // カテゴリーの説明
  image: string;            // カテゴリーの代表画像
}

// カテゴリー定数
export const CATEGORIES: Category[] = [
  {
    id: "safari",
    name: "Safari Adventures",
    icon: "🦁",
    type: "safari",
    description: "ジンバブエの野生動物との出会い",
    image: "/images/tours/game-drive-2.jpg",
  },
  {
    id: "victoria-falls",
    name: "Victoria Falls",
    icon: "💧",
    type: "victoria-falls",
    description: "世界三大瀑布のひとつ、ビクトリアフォールズを体験",
    image: "/images/tours/tour-of-the-falls-12.jpg",
  },
  {
    id: "bridge",
    name: "Bridge Adventures",
    icon: "🌉",
    type: "bridge",
    description: "ビクトリアフォールズブリッジでのスリリングな体験",
    image: "/images/tours/bungee-jump.jpg",
  },
  {
    id: "flight",
    name: "Flight Adventures",
    icon: "🚁",
    type: "flight",
    description: "空から眺める壮大なビクトリアフォールズ",
    image: "/images/tours/helicopter-experience.jpg",
  },
  {
    id: "water",
    name: "Water Adventures",
    icon: "🚤",
    type: "water",
    description: "ザンベジ川でのエキサイティングなウォーターアクティビティ",
    image: "/images/tours/white-water-rafting.jpg",
  },
  {
    id: "cultural",
    name: "Cultural & Other Tours",
    icon: "🏛️",
    type: "cultural",
    description: "ジンバブエの文化と伝統を体験",
    image: "/images/tours/traditional-village-tour-3.jpg",
  },
];

// ============================================
// React Component Props
// ============================================

// カテゴリーカード用
export interface CategoryCardProps {
  category: Category;
  tourCount: number;
  priceRange: string;
  onClick?: (categoryId: string) => void;
}

// ツアーカード用
export interface TourCardProps {
  tour: Tour;
  onClick?: (tour: Tour) => void;
}

// フィルターボタン用
export interface FilterButtonProps {
  filter: FilterType;
  isActive: boolean;
  onClick: (filter: FilterType) => void;
  children: React.ReactNode;
}

// ============================================
// Utility Types
// ============================================

// カテゴリー別のツアー統計
export interface CategoryStats {
  category: string;
  count: number;
  minPrice: number;
  maxPrice: number;
  priceRange: string;
}

// 価格をパースする関数の戻り値
export interface ParsedPrice {
  min: number;
  max: number;
  display: string;


}