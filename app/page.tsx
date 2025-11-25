"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./App.css";
import { CATEGORIES } from "./types/tour";
import { useTours } from "../hooks/useTour";
import { useCategoryStats } from "../hooks/useCategoryStats";

function HomePage() {
  const { tours, loading, error } = useTours();
  const categoryStats = useCategoryStats(tours);

  // ローディング状態
  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h2>🔄 Loading tours...</h2>
          <p>Fetching data from Supabase</p>
        </div>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className="App">
        <div className="error">
          <h2>❌ Error occurred</h2>
          <p>Error details: {error}</p>
          <button onClick={() => window.location.reload()}>
            🔄 Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* ヘッダー */}
      <header className="header">
        <Image
          src="/images/tours/Vicfalls15.jpg"
          alt="Zimbabwe landscape"
          className="header-bg"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="header-content">
          <h1>🇿🇼 Zimbabwe Adventure Tours</h1>
          <p>Discover the Beauty of Zimbabwe</p>
        </div>
      </header>

      <main className="main-content">
        {/* ヒーローセクション */}
        <section className="hero">
          <h2>Choose Your Adventure</h2>
          <p>
            エキサイティングなジンバブエの冒険を選んでください。
            <br />
            野生動物、アドレナリン全開のアクティビティ、文化体験まで。
          </p>
        </section>

        {/* カテゴリーグリッド */}
        <section className="categories">
          <div className="category-grid">
            {CATEGORIES.map((category) => {
              // このカテゴリーの統計情報を取得
              const stats = categoryStats.find(
                (s) => s.type === category.type
              );

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="category-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.name}</h3>
                  <p className="category-description">
                    {category.description}
                  </p>
                  <div className="category-info">
                    <p className="activity-count">
                      {stats?.count || 0} Activities
                    </p>
                    <p className="price-range">{stats?.priceRange || "N/A"}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

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

export default HomePage;