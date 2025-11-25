"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTourById } from "../../../hooks/useTourById";
import { CATEGORIES } from "../../types/tour";
import "../../App.css";

export default function ActivityDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // IDでツアーを取得
  const { tour, loading, error } = useTourById(id);

  // ローディング状態
  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h2>🔄 Loading activity...</h2>
          <p>Fetching activity details from Supabase</p>
        </div>
      </div>
    );
  }

  // エラー状態
  if (error || !tour) {
    return (
      <div className="App">
        <div className="error">
          <h2>❌ Activity not found</h2>
          <p>{error || `Activity with ID "${id}" was not found`}</p>
          <Link href="/" className="book-button">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // このツアーのカテゴリー情報を取得
  const category = CATEGORIES.find((cat) => cat.type === tour.type);

  return (
    <div className="App">
      {/* ナビゲーション */}
      <div className="breadcrumb">
        <Link href="/" className="breadcrumb-link">
          Home
        </Link>
        <span className="breadcrumb-separator">›</span>
        {category && (
          <>
            <Link href={`/category/${category.id}`} className="breadcrumb-link">
              {category.name}
            </Link>
            <span className="breadcrumb-separator">›</span>
          </>
        )}
        <span className="breadcrumb-current">{tour.title}</span>
      </div>

      {/* アクティビティ詳細 */}
      <main className="activity-detail">
        {/* 画像セクション */}
        <div className="activity-image">
          <img
            src={`https://placehold.co/800x500/4a9b4e/white?text=${encodeURIComponent(
              tour.title
            )}`}
            alt={tour.title}
          />
        </div>

        {/* 詳細情報 */}
        <div className="activity-content">
          {/* ヘッダー */}
          <div className="activity-header">
            <div className="activity-category-badge">
              {category?.icon} {category?.name}
            </div>
            <h1 className="activity-title">{tour.title}</h1>
            <p className="activity-description">{tour.description}</p>
          </div>

          {/* メタ情報 */}
          <div className="activity-meta-grid">
            <div className="meta-card">
              <div className="meta-icon">💰</div>
              <div className="meta-content">
                <div className="meta-label">Price</div>
                <div className="meta-value">{tour.price}</div>
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-icon">⏱️</div>
              <div className="meta-content">
                <div className="meta-label">Duration</div>
                <div className="meta-value">{tour.duration}</div>
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-icon">👥</div>
              <div className="meta-content">
                <div className="meta-label">Age Requirement</div>
                <div className="meta-value">{tour.age}</div>
              </div>
            </div>
          </div>

          {/* 詳細説明 */}
          <div className="activity-detail-section">
            <h2>Activity Details</h2>
            <p className="activity-detail-text">{tour.detail}</p>
          </div>

          {/* 特記事項 */}
          {tour.note && (
            <div className="activity-note-section">
              <div className="note-icon">ℹ️</div>
              <div>
                <h3>Important Note</h3>
                <p>{tour.note}</p>
              </div>
            </div>
          )}

          {/* CTAボタン */}
          <div className="activity-cta">
            <a
              href="https://forms.google.com/your-form-link"
              target="_blank"
              rel="noopener noreferrer"
              className="book-button-large"
            >
              📅 Book This Activity
            </a>
            {category && (
              <Link
                href={`/category/${category.id}`}
                className="back-button-large"
              >
                ← Back to {category.name}
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
