import { useState, useCallback } from 'react';
import { PromptsService, Prompt } from '@/lib/api/client';

export function useSearchPromptsByTags() {
  const [data, setData] = useState<Prompt[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const searchByTags = useCallback(async (tags: string[]) => {
    setLoading(true);
    setError(null);

    try {
      const results = await PromptsService.promptsControllerSearchByTags(tags);
      setData(results);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, searchByTags };
}
