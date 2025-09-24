import React from "react";

// type vs interface の使い分け学習
// type: union types、プリミティブ型に適している
export type TourType = "adventure" | "wildlife" | "cultural";
export type TourCategory = "natural" | "safari" | "history";
export type FilterType = "all" | "short" | "long" | TourType;

// interface: オブジェクトの形状定義、拡張可能
export interface BaseTour {
  id: number;
  title: string;
  description: string;
  image: string;
}

// interfaceの拡張（extends）
export interface Tour extends BaseTour {
  duration: number;
  type: TourType;
  category: string;
  price?: number; // オプショナル
  rating?: number; // 1-5の評価
  maxParticipants?: number;
  isPopular?: boolean;
}

// さらなる拡張
export interface DetailedTour extends Tour {
  schedule: DaySchedule[];
  inclusions: string[];
  exclusions: string[];
}

export interface DaySchedule {
  day: number;
  activities: string[];
  accommodation?: string;
}

// オプショナルプロパティの例
export interface TourWithOptionals extends Tour {
  price?: number;
  rating?: number;
  createdBy?: {
    id?: string;
    name?: string;
  };
}

// React component props の型定義
export interface TourCardProps {
  tour: Tour;
  onClick?: (tour: Tour) => void;
}

export interface FilterButtonProps {
  filter: FilterType;
  isActive: boolean;
  onClick: (filter: FilterType) => void;
  children: React.ReactNode;
}
