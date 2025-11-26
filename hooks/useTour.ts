// hooks/useTours.ts
import { useToursFromSupabase } from "./useToursFromSupabase";

export const useTours = () => {
    console.log('🔧 Using Supabase');
    return useToursFromSupabase();
};