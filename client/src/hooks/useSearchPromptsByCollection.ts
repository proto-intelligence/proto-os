import { useState, useCallback } from "react";
import { PromptsService, Prompt } from "@/lib/api/client";

export function useSearchPromptsByCollection() {
  const [data, setData] = useState<Prompt[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const searchByCollection = useCallback(async (collection: string) => {
    setLoading(true);
    setError(null);

    try {
      const results = await PromptsService.promptsControllerSearchByCollection(collection);
      setData(results);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, searchByCollection };
}
