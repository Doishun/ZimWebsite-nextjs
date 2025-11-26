"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CATEGORIES, TourType } from "../../types/tour";
import { useToursByCategory } from "../../../hooks/useToursByCategory";
import "../../App.css";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  // カテゴリー情報を取得
  const category = CATEGORIES.find((cat) => cat.id === slug);

  // このカテゴリーのツアーを取得
  const { tours, loading, error } = useToursByCategory(
    category?.type as TourType
  );

  // カテゴリーが見つからない場合
  if (!category) {
    return (
      <div className="App">
        <div className="error">
          <h2>❌ Category not found</h2>
          <p>カテゴリー "{slug}" は見つかりませんでした</p>
          <Link href="/" className="book-button">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ローディング状態
  if (loading) {
    return (
      <div className="App">
        <header className="page-header">
          <Link href="/" className="back-link">
            ← Back to Categories
          </Link>
          <h1>
            {category.icon} {category.name}
          </h1>
          <p>{category.description}</p>
        </header>
        <div className="loading">
          <h2>🔄 Loading tours...</h2>
        </div>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className="App">
        <header className="page-header">
          <Link href="/" className="back-link">
            ← Back to Categories
          </Link>
          <h1>
            {category.icon} {category.name}
          </h1>
        </header>
        <div className="error">
          <h2>❌ Error loading tours</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* ページヘッダー */}
      <header className="page-header">
        <Link href="/" className="back-link">
          ← Back to Categories
        </Link>
        <div className="category-header">
          <span className="category-header-icon">{category.icon}</span>
          <h1>{category.name}</h1>
        </div>
        <p className="category-header-description">{category.description}</p>
        <p className="tour-count">{tours.length} Activities Available</p>
      </header>

      {/* ツアーグリッド */}
      <main className="main-content">
        <div className="tour-grid">
          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={`/activity/${tour.id}`}
              className="tour-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="tour-image-container">
                <img
                  src={tour.image}
                  alt={tour.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div className="tour-card-content">
                <h4>{tour.title}</h4>
                <p className="tour-description">{tour.description}</p>
                <div className="tour-meta">
                  <div className="tour-meta-item">
                    <span className="meta-label">💰 Price:</span>
                    <span className="meta-value">{tour.price}</span>
                  </div>
                  <div className="tour-meta-item">
                    <span className="meta-label">⏱️ Duration:</span>
                    <span className="meta-value">{tour.duration}</span>
                  </div>
                  <div className="tour-meta-item">
                    <span className="meta-label">👥 Age:</span>
                    <span className="meta-value">{tour.age}</span>
                  </div>
                </div>
                {tour.note && (
                  <div className="tour-note">
                    <span>ℹ️</span> {tour.note}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* ツアーがない場合 */}
        {tours.length === 0 && (
          <div className="no-tours">
            <p>このカテゴリーにはまだツアーがありません</p>
            <Link href="/" className="book-button">
              ← Back to Categories
            </Link>
          </div>
        )}

        {/* CTAセクション */}
        <section className="contact">
          <h3>Ready to Book Your Adventure?</h3>
          <p>
            ツアーの詳細を確認して、忘れられないジンバブエの旅を予約しましょう！
          </p>
          <a
            href="https://forms.google.com/your-form-link"
            target="_blank"
            rel="noopener noreferrer"
            className="book-button"
          >
            📅 Contact Us
          </a>
        </section>
      </main>
    </div>
  );
}
