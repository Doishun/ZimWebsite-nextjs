// ファイル名を修正したので、データベースのパスも更新
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 修正後のファイル名に合わせた画像パス
const imageMapping = {
  // Safari & Victoria Falls
  1: '/images/tours/tour-of-the-falls-12.jpg',        // Tour of the Falls
  2: '/images/tours/game-drive-2.jpg',                 // Game Drive
  3: '/images/tours/game-drive-2.jpg',                 // Game Walk
  4: '/images/tours/game-drive-2.jpg',                 // Night Game Drive
  5: '/images/tours/game-drive-2.jpg',                 // Hwange Safari Experience
  6: '/images/tours/elephant-experience.jpg',          // Elephant Experience

  // Bridge Adventures
  7: '/images/tours/bungee-jump.jpg',                  // Bungee Jump
  8: '/images/tours/bridge-swing.jpg',                 // Bridge Swing
  9: '/images/tours/bridge-slide-zipline.jpg',         // Bridge Slide / Zipline

  // Flight Adventures
  10: '/images/tours/helicopter-experience.jpg',       // Helicopter Experience

  // Water Adventures
  11: '/images/tours/white-water-rafting.jpg',         // White Water Rafting
  12: '/images/tours/adventure-jetboat.jpg',           // Adventure Jetboat
  13: '/images/tours/river-cruises.jpg',               // River Cruises

  // Cultural & Other Tours
  14: '/images/tours/traditional-village-tour-3.jpg',  // Rural Village Tour
  15: '/images/tours/vicfalls15.jpg',                  // Gorge Hiking
  16: '/images/tours/chobe-day-trip.jpg',              // Chobe Day Trip
};

async function fixImagePaths() {
  console.log('\n=== 🔧 画像パスを修正中 ===\n');

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
      console.log(`✅ [${id}] ${data[0].title} → ${fileName}`);
      successCount++;
    }
  }

  console.log('\n=== 📊 修正結果 ===');
  console.log(`成功: ${successCount}件`);
  console.log(`失敗: ${errorCount}件\n`);
}

fixImagePaths();
