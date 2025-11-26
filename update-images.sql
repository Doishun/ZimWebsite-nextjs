-- ツアー画像を既存の写真に更新
-- 既存ファイル:
-- - Game Drive-2.jpg
-- - Tour of the falls-12.jpg
-- - Traditional Village tour-3.jpg
-- - Vicfalls15.jpg

-- Safari & Victoria Falls (ID: 1-6)
UPDATE tours SET image = '/images/tours/Tour of the falls-12.jpg' WHERE id = 1; -- Tour of the Falls
UPDATE tours SET image = '/images/tours/Game Drive-2.jpg' WHERE id = 2; -- Game Drive
UPDATE tours SET image = '/images/tours/Game Drive-2.jpg' WHERE id = 3; -- Game Walk
UPDATE tours SET image = '/images/tours/Game Drive-2.jpg' WHERE id = 4; -- Night Game Drive
UPDATE tours SET image = '/images/tours/Game Drive-2.jpg' WHERE id = 5; -- Hwange Safari Experience
UPDATE tours SET image = '/images/tours/Game Drive-2.jpg' WHERE id = 6; -- Elephant Experience

-- Bridge Adventures (ID: 7-9)
UPDATE tours SET image = '/images/tours/Vicfalls15.jpg' WHERE id = 7; -- Bungee Jump
UPDATE tours SET image = '/images/tours/Vicfalls15.jpg' WHERE id = 8; -- Bridge Swing
UPDATE tours SET image = '/images/tours/Vicfalls15.jpg' WHERE id = 9; -- Bridge Slide / Zipline

-- Flight Adventures (ID: 10)
UPDATE tours SET image = '/images/tours/Vicfalls15.jpg' WHERE id = 10; -- Helicopter Experience

-- Water Adventures (ID: 11-13)
UPDATE tours SET image = '/images/tours/Vicfalls15.jpg' WHERE id = 11; -- White Water Rafting
UPDATE tours SET image = '/images/tours/Vicfalls15.jpg' WHERE id = 12; -- Adventure Jetboat
UPDATE tours SET image = '/images/tours/Vicfalls15.jpg' WHERE id = 13; -- River Cruises

-- Cultural & Other Tours (ID: 14-16)
UPDATE tours SET image = '/images/tours/Traditional Village tour-3.jpg' WHERE id = 14; -- Rural Village Tour
UPDATE tours SET image = '/images/tours/Vicfalls15.jpg' WHERE id = 15; -- Gorge Hiking
UPDATE tours SET image = '/images/tours/Vicfalls15.jpg' WHERE id = 16; -- Chobe Day Trip
