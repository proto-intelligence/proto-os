import { useEffect, useState } from "react";
import { PromptsService } from "@/lib/api/client";

export function useGetAllCollections() {
  const [collections, setCollections] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await PromptsService.promptsControllerGetAllCollections();
        setCollections(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return { collections, loading, error };
}
