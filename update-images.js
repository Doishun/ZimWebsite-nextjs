// ツアー画像を既存の写真に更新するスクリプト
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// 画像マッピング（実際のファイル名を使用）
const imageMapping = {
  1: '/images/tours/Tour of the falls-12.jpg',  // Tour of the Falls
  2: '/images/tours/Game Drive-2.jpg',          // Game Drive
  3: '/images/tours/Game Drive-2.jpg',          // Game Walk
  4: '/images/tours/Game Drive-2.jpg',          // Night Game Drive
  5: '/images/tours/Game Drive-2.jpg',          // Hwange Safari Experience
  6: '/images/tours/Game Drive-2.jpg',          // Elephant Experience
  7: '/images/tours/Vicfalls15.jpg',            // Bungee Jump
  8: '/images/tours/Vicfalls15.jpg',            // Bridge Swing
  9: '/images/tours/Vicfalls15.jpg',            // Bridge Slide / Zipline
  10: '/images/tours/Vicfalls15.jpg',           // Helicopter Experience
  11: '/images/tours/Vicfalls15.jpg',           // White Water Rafting
  12: '/images/tours/Vicfalls15.jpg',           // Adventure Jetboat
  13: '/images/tours/Vicfalls15.jpg',           // River Cruises
  14: '/images/tours/Traditional Village tour-3.jpg', // Rural Village Tour
  15: '/images/tours/Vicfalls15.jpg',           // Gorge Hiking
  16: '/images/tours/Vicfalls15.jpg',           // Chobe Day Trip
};

async function updateImages() {
  console.log('\n=== Updating Tour Images ===\n');

  for (const [id, imagePath] of Object.entries(imageMapping)) {
    const { data, error } = await supabase
      .from('tours')
      .update({ image: imagePath })
      .eq('id', id)
      .select('id, title, image');

    if (error) {
      console.error(`❌ Error updating ID ${id}:`, error.message);
    } else if (data && data.length > 0) {
      console.log(`✅ ID ${id}: ${data[0].title}`);
      console.log(`   → ${imagePath}`);
    }
  }

  console.log('\n=== Update Complete ===\n');
}

updateImages();
