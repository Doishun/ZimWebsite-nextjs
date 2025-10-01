// hooks/useToursFromMock.ts
import { useState, useEffect } from "react";
import { Tour } from "../app/types/tour";

const MOCK_API_URL = "http://localhost:3002/tours";

export const useToursFromMock = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTours = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(MOCK_API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Mock APIのデータをTour型に変換
            const typedTours: Tour[] = data.map((tour: any) => ({
                id: tour.id,
                title: tour.title,
                description: tour.description,
                duration: tour.duration,
                type: tour.type,
                category: tour.category,
                image: tour.image,
                created_at: tour.createdAt,
                updated_at: tour.updatedAt,
            }));

            setTours(typedTours);
        } catch (error: any) {
            setError(error.message);
            console.error("Mock API fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours();
    }, []);

    return { tours, loading, error, refetch: fetchTours };
};