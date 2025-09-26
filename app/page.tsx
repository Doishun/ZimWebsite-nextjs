"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import "./App.css";
import { Tour, FilterType } from "./types/tour";
import { useTours } from "../hooks/useTour";

function App() {
  const { tours, loading, error } = useTours();

  // TypeScript型定義を活用した状態管理
  const [selectedFilter, setSelectedFilter] = React.useState<FilterType>("all");

  // TypeScript型安全性を活用したフィルタリング関数
  const filteredTours: Tour[] = tours.filter((tour: Tour) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "short") return tour.duration <= 3;
    if (selectedFilter === "long") return tour.duration >= 5;
    return tour.type === selectedFilter;
  });
  // タイトルの更新
  useEffect(() => {
    document.title = `Zimbabwe Tours - ${selectedFilter}`;
  }, [selectedFilter]);

  //アニメーション効果
  useEffect(() => {
    const cards = document.querySelectorAll(".tour-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 200);
    });
  }, [filteredTours]);

  // ローディング状態
  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h2>🔄 ツアー情報を読み込み中...</h2>
          <p>Supabaseからデータを取得しています</p>
        </div>
      </div>
    );
  }

  // エラー状態
  if (error) {
    return (
      <div className="App">
        <div className="error">
          <h2>❌ エラーが発生しました</h2>
          <p>エラー詳細: {error}</p>
          <button onClick={() => window.location.reload()}>
            🔄 再読み込み
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="App">
      <header className="header">
        <Image
          src="/images/tours/Vicfalls15.jpg"
          alt="ジンバブエの美しい風景"
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
        <section className="hero">
          <h2>Experience Amazing Zimbabwe</h2>
          <p>
            Join us for unforgettable adventures through Zimbabwe&apos;s
            stunning landscapes, wildlife, and culture.
          </p>
        </section>

        <section className="tours">
          <h3>Popular Tours</h3>

          {/* フィルターボタンを追加 */}
          <div className="filter-buttons">
            <button
              className={
                selectedFilter === "all" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setSelectedFilter("all")}
            >
              All Tours
            </button>
            <button
              className={
                selectedFilter === "short" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setSelectedFilter("short")}
            >
              Short (≤3 days)
            </button>
            <button
              className={
                selectedFilter === "long" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => setSelectedFilter("long")}
            >
              Long (≥5 days)
            </button>
            <button
              className={
                selectedFilter === "adventure"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setSelectedFilter("adventure")}
            >
              Adventure
            </button>
            <button
              className={
                selectedFilter === "wildlife"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setSelectedFilter("wildlife")}
            >
              Wildlife
            </button>
            <button
              className={
                selectedFilter === "cultural"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => setSelectedFilter("cultural")}
            >
              Cultural
            </button>
          </div>
        </section>

        <div className="tour-grid">
          {filteredTours.map((tour: Tour) => (
            <div key={tour.id} className="tour-card">
              <div
                style={{ position: "relative", width: "100%", height: "200px" }}
              >
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  style={{ objectFit: "cover", borderRadius: "5px" }}
                />
              </div>
              <h4>{tour.title}</h4>
              <p>{tour.description}</p>
              <p>
                <strong>Duration:</strong> {tour.duration} days
              </p>
              <p>
                <strong>Type:</strong> {tour.type}
              </p>
            </div>
          ))}
        </div>

        <section className="contact">
          <h3>Ready to Book?</h3>
          <p>Contact us to plan your perfect Zimbabwe adventure!</p>
          <a
            href="https://forms.google.com/your-form-link"
            target="_blank"
            rel="noopener noreferrer"
            className="book-button"
          >
            Book Your Tour
          </a>
        </section>
      </main>
    </div>
  );
}

export default App;
