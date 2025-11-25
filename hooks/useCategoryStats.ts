// hooks/useCategoryStats.ts
import { useMemo } from "react";
import { Tour, CategoryStats, CATEGORIES } from "../app/types/tour";

/**
 * 価格文字列をパースして数値に変換
 * @param priceStr - "$27" or "$113~$166" 形式
 */
const parsePrice = (priceStr: string): { min: number; max: number } => {
    // "$" を削除
    const cleaned = priceStr.replace(/\$/g, '');

    // "~" で分割（レンジがある場合）
    if (cleaned.includes('~')) {
        const [min, max] = cleaned.split('~').map(p => parseInt(p.trim()));
        return { min, max };
    }

    // 単一価格の場合
    const price = parseInt(cleaned);
    return { min: price, max: price };
};

/**
 * カテゴリー別の統計情報を計算するフック
 * @param tours - 全ツアーデータ
 */
export const useCategoryStats = (tours: Tour[]) => {
    const stats = useMemo(() => {
        return CATEGORIES.map(category => {
            // このカテゴリーのツアーをフィルター
            const categoryTours = tours.filter(tour => tour.type === category.type);

            if (categoryTours.length === 0) {
                return {
                    category: category.name,
                    type: category.type,
                    icon: category.icon,
                    count: 0,
                    minPrice: 0,
                    maxPrice: 0,
                    priceRange: "N/A",
                };
            }

            // 価格の最小値・最大値を計算
            let minPrice = Infinity;
            let maxPrice = -Infinity;

            categoryTours.forEach(tour => {
                const { min, max } = parsePrice(tour.price);
                minPrice = Math.min(minPrice, min);
                maxPrice = Math.max(maxPrice, max);
            });

            // 価格レンジの表示文字列を生成
            const priceRange = minPrice === maxPrice
                ? `$${minPrice}`
                : `$${minPrice} - $${maxPrice}`;

            return {
                category: category.name,
                type: category.type,
                icon: category.icon,
                count: categoryTours.length,
                minPrice,
                maxPrice,
                priceRange,
            };
        });
    }, [tours]);

    return stats;
};

/**
 * 使用例：
 *
 * const { tours } = useTours();
 * const categoryStats = useCategoryStats(tours);
 *
 * categoryStats.forEach(stat => {
 *   console.log(`${stat.icon} ${stat.category}: ${stat.count}件 (${stat.priceRange})`);
 * });
 *
 * // 出力例：
 * // 🦁 Safari & Victoria Falls: 6件 ($27 - $281)
 * // 🌉 Bridge Adventures: 3件 ($48 - $168)
 */
