// Supabaseの全ツアーを確認するスクリプト
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkTours() {
  const { data, error } = await supabase
    .from('tours')
    .select('id, title, type, category, image')
    .order('id');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n=== Current Tours ===\n');
  data.forEach(tour => {
    console.log(`ID: ${tour.id}`);
    console.log(`Title: ${tour.title}`);
    console.log(`Type: ${tour.type}`);
    console.log(`Category: ${tour.category}`);
    console.log(`Image: ${tour.image || '(not set)'}`);
    console.log('---');
  });

  console.log(`\nTotal: ${data.length} tours\n`);
}

checkTours();
