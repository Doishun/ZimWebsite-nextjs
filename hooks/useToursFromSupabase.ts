// hooks/useToursFromSupabase.ts
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

            console.log('=== SUPABASE FETCH DEBUG ===');
            console.log('1. Supabase client exists?', !!supabase);
            console.log('2. Supabase client:', supabase);

            if (!supabase) {
                throw new Error('Supabase client is not initialized');
            }

            console.log('3. Fetching from tours table...');

            const { data, error: fetchError } = await supabase
                .from("tours")
                .select("*")
                .order("created_at", { ascending: false });

            console.log('4. Response data:', data);
            console.log('5. Response error:', fetchError);
            console.log('6. Data length:', data?.length);

            if (fetchError) {
                console.error('❌ Supabase error:', fetchError);
                throw fetchError;
            }

            if (!data || data.length === 0) {
                console.warn('⚠️ No data returned from Supabase');
                setTours([]);
                return;
            }

            // 型変換
            const typedTours: Tour[] = data.map((tour: any) => ({
                id: tour.id,
                title: tour.title,
                description: tour.description,
                detail: tour.detail,
                price: tour.price,
                duration: tour.duration,
                age: tour.age,
                type: tour.type,
                category: tour.category,
                image: tour.image,
                note: tour.note,
                created_at: tour.created_at,
                updated_at: tour.updated_at,
            }));

            console.log('7. Typed tours:', typedTours);
            console.log('8. Setting tours state...');

            setTours(typedTours);

            console.log('✅ Tours set successfully');
        } catch (error: any) {
            console.error('❌ Fetch tours error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
            console.log('=== FETCH COMPLETE ===');
        }
    };

    useEffect(() => {
        console.log('🔄 useEffect triggered - fetching tours');
        fetchTours();
    }, []);

    console.log('🎯 Hook state:', { toursCount: tours.length, loading, error });

    return { tours, loading, error, refetch: fetchTours };
};