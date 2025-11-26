// 画像の使用状況を分析するスクリプト
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function analyzeImages() {
  // Supabaseからツアーデータを取得
  const { data: tours, error } = await supabase
    .from('tours')
    .select('id, title, type, category, image')
    .order('id');

  if (error) {
    console.error('Error:', error);
    return;
  }

  // 実際に存在する画像ファイルを確認
  const imagesDir = path.join(__dirname, 'public/images/tours');
  const actualFiles = fs.readdirSync(imagesDir);

  console.log('\n=== 📂 実際に存在する画像ファイル ===\n');
  actualFiles.forEach(file => {
    console.log(`  ✅ ${file}`);
  });
  console.log(`\n合計: ${actualFiles.length}ファイル\n`);

  // 画像使用状況を集計
  const imageUsage = {};
  tours.forEach(tour => {
    if (!imageUsage[tour.image]) {
      imageUsage[tour.image] = [];
    }
    imageUsage[tour.image].push(tour);
  });

  console.log('=== 📊 画像使用状況 ===\n');

  Object.keys(imageUsage).sort().forEach(imagePath => {
    const tours = imageUsage[imagePath];
    const fileName = imagePath.split('/').pop();
    const exists = actualFiles.includes(fileName);

    console.log(`${exists ? '✅' : '❌'} ${imagePath}`);
    console.log(`   使用回数: ${tours.length}回`);
    console.log(`   使用ツアー:`);
    tours.forEach(tour => {
      console.log(`      - [${tour.id}] ${tour.title} (${tour.type})`);
    });
    console.log('');
  });

  // 写真が必要なツアーをリストアップ
  console.log('=== 🎯 写真が必要なアクティビティ ===\n');

  const categories = {
    safari: [],
    bridge: [],
    flight: [],
    water: [],
    cultural: []
  };

  tours.forEach(tour => {
    if (categories[tour.type]) {
      categories[tour.type].push(tour);
    }
  });

  Object.keys(categories).forEach(type => {
    const categoryTours = categories[type];
    if (categoryTours.length > 0) {
      console.log(`\n【${type.toUpperCase()}】`);
      categoryTours.forEach(tour => {
        const fileName = tour.image.split('/').pop();
        const hasUniqueImage = imageUsage[tour.image].length === 1;
        console.log(`  ${hasUniqueImage ? '✅' : '⚠️'} [${tour.id}] ${tour.title}`);
        console.log(`     現在の画像: ${fileName}`);
        if (!hasUniqueImage) {
          console.log(`     ⚠️ この画像は${imageUsage[tour.image].length}個のツアーで共有されています`);
        }
      });
    }
  });

  // 推奨される画像ファイル名リスト
  console.log('\n\n=== 📝 推奨される新しい画像ファイル名 ===\n');

  tours.forEach(tour => {
    const hasUniqueImage = imageUsage[tour.image].length === 1;
    if (!hasUniqueImage) {
      const recommendedName = tour.title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      console.log(`[${tour.id}] ${tour.title}`);
      console.log(`   推奨ファイル名: ${recommendedName}.jpg`);
    }
  });
}

analyzeImages();
