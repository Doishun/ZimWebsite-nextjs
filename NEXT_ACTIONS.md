# Next Actions - Zimbabwe Tour Website

フォント修正
日本語修正

---

## 📸 優先: 画像の重複解消

### 現状
同じ画像を複数のツアーで使用している箇所がある:
- **Game Drive-2.jpg**: 5ツアーで共有
  - Game Drive (適切)
  - Game Walk
  - Night Game Drive
  - Hwange Safari Experience
  - Elephant Experience (elephant-experience.jpgに変更済み)

### 必要な追加画像
以下のツアー用に個別画像を追加:
1. **Game Walk** → `game-walk.jpg`
2. **Night Game Drive** → `night-game-drive.jpg`
3. **Hwange Safari Experience** → `hwange-safari.jpg`
4. **Gorge Hiking** → `gorge-hiking.jpg` (現在vicfalls15.jpgを使用)

### 対応手順
1. 上記4枚の画像を取得/作成
2. `public/images/tours/` に配置
3. Supabaseのデータを更新
4. 画像表示を確認

---

## 🎯 候補: アクティビティ詳細ページ (保留)

### 概要
各ツアーの詳細情報を表示するページ

### 実装内容
- ファイル: `app/activity/[id]/page.tsx`
- 表示内容:
  - 大きな画像
  - タイトル・詳細説明
  - 価格・期間・年齢制限
  - 予約ボタン (Google Formsリンク)
  - 「Back to Category」リンク

### フック
- `hooks/useTourById.ts` (既に作成済み)

**優先度**: 中 (ユーザーからの要望があれば実装)

---

## 📋 その他の改善項目

### 1. Google Formsリンクの設定
- 現在: プレースホルダーURL
- 対応: 実際の予約フォームURLに更新

### 2. 画像最適化
- 大きな画像ファイルの圧縮
- WebP形式への変換検討
- Lazy loading の実装

### 3. レスポンシブ対応の強化
- モバイルでの表示確認
- タブレットサイズの最適化

### 4. SEO対応
- メタタグの追加 (title, description)
- OGP画像の設定
- sitemap.xml の作成

### 5. パフォーマンス改善
- Next.js Image コンポーネントの活用
- 画像の遅延読み込み
- キャッシュ戦略の最適化

---

## 📝 実施順序

1. ✅ **即時**: Victoria Fallsデータ修正
2. ✅ **今週**: 画像の重複解消
3. 🔲 **必要時**: アクティビティ詳細ページ作成
4. 🔲 **随時**: その他の改善項目

---

## 🔧 技術的メモ

### 完了した作業
- ✅ Safari & Victoria Falls カテゴリー分割
- ✅ ホームページにカテゴリー画像追加
- ✅ カテゴリーページにCTAセクション追加
- ✅ 画像表示の修正 (CSS追加)
- ✅ 13枚の画像を追加・設定

### 使用技術
- Next.js 15.5.3
- React 19.1.0
- Supabase (PostgreSQL)
- TypeScript

### データ構造
- 6カテゴリー (Safari, Victoria Falls, Bridge, Flight, Water, Cultural)
- 16アクティビティ
- 13画像ファイル
