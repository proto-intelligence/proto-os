import { useEffect, useState } from 'react';
import { Prompt, PromptsService } from '@/lib/api/client'; // adjust import paths if needed
export function useGetAllPrompts() {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const data = await PromptsService.promptsControllerFindAll(); // assuming this method exists
        setPrompts(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  return { prompts, loading, error };
}
