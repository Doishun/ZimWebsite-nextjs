import React from "react";

// type vs interface の使い分け学習
// type: union types、プリミティブ型に適している
export type TourType = "adventure" | "wildlife" | "cultural";
export type TourCategory = "natural" | "safari" | "history";
export type FilterType = "all" | "short" | "long" | TourType;

// interface: オブジェクトの形状定義、拡張可能
export interface Tour {
  id: number;
  title: string;
  description: string;
  duration: number;
  type: TourType;
  category: TourCategory;
  image: string;
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
