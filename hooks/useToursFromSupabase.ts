// hooks/useTours.ts
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Tour, DatabaseTour } from "../app/types/tour";

export const useToursFromSupabase = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTours = async () => {
        try {
            setLoading(true);
            setError(null);
            if (!supabase) {
                throw new Error('Supabase client is not initialized. Please check your environment variables.');
            }

            const { data, error } = await supabase
                .from("tours")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            // DatabaseTour から Tour に型変換
            const typedTours: Tour[] = (data || []).map((tour: DatabaseTour) => ({
                ...tour,
                type: tour.type as Tour["type"], // 型安全な変換
            }));

            setTours(typedTours);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours();
    }, []);

    return { tours, loading, error, refetch: fetchTours };
};