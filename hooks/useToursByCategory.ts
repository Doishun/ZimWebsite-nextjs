// hooks/useToursByCategory.ts
import { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { Tour, DatabaseTour, TourType } from "../app/types/tour";

/**
 * カテゴリー別にツアーを取得するフック
 * @param categoryType - カテゴリータイプ（safari, bridge, flight, water, cultural）
 */
export const useToursByCategory = (categoryType: TourType) => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchToursByCategory = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!supabase) {
                throw new Error('Supabase client is not initialized');
            }

            console.log(`🔍 Fetching tours for category: ${categoryType}`);

            // カテゴリーでフィルタリング
            const { data, error: fetchError } = await supabase
                .from("tours")
                .select("*")
                .eq("type", categoryType)  // ← type でフィルター
                .order("created_at", { ascending: false });

            if (fetchError) throw fetchError;

            // 型変換
            const typedTours: Tour[] = (data || []).map((tour: DatabaseTour) => ({
                id: tour.id,
                title: tour.title,
                description: tour.description,
                detail: tour.detail,
                price: tour.price,
                duration: tour.duration,
                age: tour.age,
                type: tour.type as TourType,
                category: tour.category,
                image: tour.image,
                note: tour.note || undefined,
                created_at: tour.created_at,
                updated_at: tour.updated_at,
            }));

            console.log(`✅ Found ${typedTours.length} tours`);
            setTours(typedTours);
        } catch (error: any) {
            console.error('❌ Fetch tours by category error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchToursByCategory();
    }, [categoryType]);  // categoryType が変わったら再取得

    return { tours, loading, error, refetch: fetchToursByCategory };
};