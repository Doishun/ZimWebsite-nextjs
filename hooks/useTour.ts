// hooks/useTours.ts
import { useToursFromMock } from "./useToursFromMock";
import { useToursFromSupabase } from "./useToursFromSupabase";

export const useTours = () => {
    const useMockAPI = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

    console.log(`🔧 Using ${useMockAPI ? "Mock API" : "Supabase"}`);

    if (useMockAPI) {
        return useToursFromMock();
    }

    return useToursFromSupabase();
};