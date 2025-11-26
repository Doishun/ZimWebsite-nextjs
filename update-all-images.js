// 全ツアーの画像を個別のファイルに更新するスクリプト
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 各ツアーに個別の画像を割り当て
const imageMapping = {
  // Safari & Victoria Falls
  1: '/images/tours/Tour of the falls-12.jpg',        // Tour of the Falls
  2: '/images/tours/Game Drive-2.jpg',                 // Game Drive
  3: '/images/tours/Game Drive-2.jpg',                 // Game Walk (同じ系統なので共有)
  4: '/images/tours/Game Drive-2.jpg',                 // Night Game Drive (同じ系統なので共有)
  5: '/images/tours/Game Drive-2.jpg',                 // Hwange Safari Experience
  6: '/images/tours/elephant-experience.jpg',          // Elephant Experience ⭐ NEW

  // Bridge Adventures
  7: '/images/tours/bungee-jump.jpg',                  // Bungee Jump ⭐ NEW
  8: '/images/tours/bridge-swing.jpg',                 // Bridge Swing ⭐ NEW
  9: '/images/tours/bridge-slide-zipline.jpg',         // Bridge Slide / Zipline ⭐ NEW

  // Flight Adventures
  10: '/images/tours/helicopter-experience.jpg',       // Helicopter Experience ⭐ NEW

  // Water Adventures
  11: '/images/tours/white-water-rafting.jpg',         // White Water Rafting ⭐ NEW
  12: '/images/tours/adventure-jetboat.jpg',           // Adventure Jetboat ⭐ NEW
  13: '/images/tours/river-cruises.jpg',               // River Cruises ⭐ NEW

  // Cultural & Other Tours
  14: '/images/tours/Traditional Village tour-3.jpg',  // Rural Village Tour
  15: '/images/tours/Vicfalls15.jpg',                  // Gorge Hiking (滝関連なのでVicfalls)
  16: '/images/tours/chobe-day-trip.jpg',              // Chobe Day Trip ⭐ NEW
};

async function updateAllImages() {
  console.log('\n=== 🖼️  全ツアー画像の更新開始 ===\n');

  let successCount = 0;
  let errorCount = 0;

  for (const [id, imagePath] of Object.entries(imageMapping)) {
    const { data, error } = await supabase
      .from('tours')
      .update({ image: imagePath })
      .eq('id', id)
      .select('id, title, image');

    if (error) {
      console.error(`❌ [ID ${id}] エラー:`, error.message);
      errorCount++;
    } else if (data && data.length > 0) {
      const fileName = imagePath.split('/').pop();
      console.log(`✅ [${id}] ${data[0].title}`);
      console.log(`   → ${fileName}`);
      successCount++;
    }
  }

  console.log('\n=== 📊 更新結果 ===');
  console.log(`成功: ${successCount}件`);
  console.log(`失敗: ${errorCount}件`);
  console.log('\n✨ 更新完了！\n');
}

updateAllImages();
