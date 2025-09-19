# 🇿🇼 Zimbabwe Adventure Tours

ジンバブエの魅力的なツアーを紹介する Web サイト

## 📖 プロジェクト概要

友人のツアー事業支援とバックエンド技術学習を目的とした、ジンバブエツアー紹介サイトです。

### 🎯 目的

- 個人ツアー事業のオンライン展開支援
- Next.js + TypeScript + Supabase の実践学習
- モダン Web 開発技術の習得

## 🛠️ 技術スタック

### フロントエンド

- **Next.js 15.5.3** - React フレームワーク
- **TypeScript** - 型安全な開発
- **CSS3** - スタイリング（今後 Emotion に移行予定）

### バックエンド

- **Supabase** - Backend as a Service
  - PostgreSQL データベース
  - リアルタイム機能
  - 認証・ストレージ

### インフラ

- **Vercel** - デプロイ・ホスティング
- **GitHub** - バージョン管理

## 📁 プロジェクト構造

```
ZimWebsite-nextjs/
├── app/
│   ├── page.tsx          # メインページコンポーネント
│   ├── layout.tsx        # ルートレイアウト
│   ├── App.css          # コンポーネントスタイル
│   ├── globals.css      # グローバルスタイル
│   └── types/
│       └── tour.ts      # TypeScript型定義
├── public/
│   └── images/
│       └── tours/       # ツアー画像
├── lib/
│   └── supabase.ts      # Supabase設定（予定）
└── docs/
    ├── setup.md         # セットアップ手順
    └── supabase-integration.md  # Supabase連携手順
```

## 🚀 クイックスタート

### 前提条件

- Node.js 18+
- npm または yarn

### インストール・起動

```bash
# リポジトリクローン
git clone https://github.com/[username]/ZimWebsite-nextjs.git
cd ZimWebsite-nextjs

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで `http://localhost:3000` にアクセス

## ✨ 現在の機能

- [x] レスポンシブデザインのツアー一覧表示
- [x] カテゴリ別フィルタリング機能
- [x] 画像最適化（Next.js Image）
- [x] アニメーション効果
- [x] TypeScript 型安全性

## 🔄 開発ロードマップ

### Phase 1: 基盤構築 ✅

- [x] Next.js + TypeScript セットアップ
- [x] 基本 UI コンポーネント作成
- [x] 静的データでの動作確認

### Phase 2: Supabase 連携 🚧

- [ ] Supabase プロジェクト作成
- [ ] データベース設計・構築
- [ ] API クライアント実装
- [ ] CRUD 機能実装

### Phase 3: 機能拡張 📋

- [ ] 管理者向け CMS 機能
- [ ] 画像アップロード機能
- [ ] Google Forms 連携
- [ ] SEO 最適化

### Phase 4: 本番化 📋

- [ ] Emotion 移行
- [ ] パフォーマンス最適化
- [ ] Vercel デプロイ
- [ ] ドメイン設定

## 📚 学習ポイント

このプロジェクトを通じて習得可能な技術：

- **フロントエンド**: React/Next.js, TypeScript, CSS-in-JS
- **バックエンド**: Supabase, PostgreSQL, API 設計
- **インフラ**: Vercel, 環境変数管理
- **開発プロセス**: Git, 段階的リファクタリング

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 📞 お問い合わせ

プロジェクトに関する質問やフィードバックがございましたら、Issues をご利用ください。

---

**Built with ❤️ for Zimbabwe Tourism**
