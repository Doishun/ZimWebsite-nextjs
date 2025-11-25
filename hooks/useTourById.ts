// hooks/useTourById.ts
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Tour, DatabaseTour, TourType } from "../app/types/tour";

/**
 * IDで個別ツアーを取得するフック
 * @param id - ツアーID
 */
export const useTourById = (id: number | string) => {
    const [tour, setTour] = useState<Tour | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTourById = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!supabase) {
                throw new Error('Supabase client is not initialized');
            }

            console.log(`🔍 Fetching tour with ID: ${id}`);

            // IDで1件取得
            const { data, error: fetchError } = await supabase
                .from("tours")
                .select("*")
                .eq("id", id)
                .single();  // ← 1件のみ取得

            if (fetchError) throw fetchError;

            if (!data) {
                throw new Error(`Tour with ID ${id} not found`);
            }

            // 型変換
            const typedTour: Tour = {
                id: data.id,
                title: data.title,
                description: data.description,
                detail: data.detail,
                price: data.price,
                duration: data.duration,
                age: data.age,
                type: data.type as TourType,
                category: data.category,
                image: data.image,
                note: data.note || undefined,
                created_at: data.created_at,
                updated_at: data.updated_at,
            };

            console.log(`✅ Tour found: ${typedTour.title}`);
            setTour(typedTour);
        } catch (error: any) {
            console.error('❌ Fetch tour by ID error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchTourById();
        }
    }, [id]);  // id が変わったら再取得

    return { tour, loading, error, refetch: fetchTourById };
};
