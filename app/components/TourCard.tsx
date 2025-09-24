// app/components/TourCard.tsx
import React from "react";
import Image from "next/image";
import { TourCardProps } from "../types/tour";

const TourCard: React.FC<TourCardProps> = ({ tour, onClick }) => {
  // ?? 演算子の実践活用
  const displayPrice = tour.price ?? "お問い合わせください";
  const displayRating = tour.rating ?? "未評価";
  const displayMaxParticipants = tour.maxParticipants ?? "制限なし";

  const handleClick = () => {
    // オプショナルな関数の安全な呼び出し
    onClick?.(tour);
  };

  return (
    <div className="tour-card" onClick={handleClick}>
      <Image
        src={tour.image}
        alt={tour.title}
        width={400}
        height={250}
        priority
      />
      <div className="tour-content">
        <h4>{tour.title}</h4>
        <p>{tour.description}</p>

        {/* 基本情報 */}
        <div className="tour-meta">
          <p>
            <strong>Duration:</strong> {tour.duration} days
          </p>
          <p>
            <strong>Type:</strong> {tour.type}
          </p>

          {/* オプショナルプロパティの安全な表示 */}
          <p>
            <strong>Price:</strong> {displayPrice}
          </p>
          <p>
            <strong>Rating:</strong> {displayRating}
          </p>
          <p>
            <strong>Max Participants:</strong> {displayMaxParticipants}
          </p>

          {/* 人気ツアーバッジ */}
          {tour.isPopular && <span className="popular-badge">人気!</span>}
        </div>
      </div>
    </div>
  );
};

export default TourCard;
