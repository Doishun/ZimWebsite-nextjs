// Safari & Victoria Falls カテゴリーを分割
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function updateCategories() {
  console.log('\n=== 🔄 カテゴリーの分割開始 ===\n');

  // Tour of the Falls を Victoria Falls カテゴリーに変更
  const { data: victoriaFalls, error: vfError } = await supabase
    .from('tours')
    .update({
      type: 'victoria-falls',
      category: 'Victoria Falls'
    })
    .eq('id', 1)
    .select('id, title, type, category');

  if (vfError) {
    console.error('❌ Victoria Falls更新エラー:', vfError);
  } else {
    console.log('✅ Victoria Falls カテゴリー作成:');
    console.log(`   [${victoriaFalls[0].id}] ${victoriaFalls[0].title}`);
    console.log(`   → type: "${victoriaFalls[0].type}", category: "${victoriaFalls[0].category}"`);
  }

  console.log('');

  // 残りのサファリツアーを Safari Adventures に更新
  const safariIds = [2, 3, 4, 5, 6];

  console.log('✅ Safari Adventures カテゴリー更新:');

  for (const id of safariIds) {
    const { data, error } = await supabase
      .from('tours')
      .update({
        type: 'safari',
        category: 'Safari Adventures'
      })
      .eq('id', id)
      .select('id, title, type, category');

    if (error) {
      console.error(`❌ [ID ${id}] エラー:`, error);
    } else {
      console.log(`   [${data[0].id}] ${data[0].title}`);
      console.log(`   → type: "${data[0].type}", category: "${data[0].category}"`);
    }
  }

  console.log('\n=== ✨ カテゴリー分割完了 ===\n');
}

updateCategories();
