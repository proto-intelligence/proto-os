import { useEffect, useState } from 'react';
import { PromptsService } from '@/lib/api/client'; // Adjust the path if needed

export function useGetAllTags() {
  const [tags, setTags] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTags = async () => {
      try {
        const data = await PromptsService.promptsControllerGetAllTags();
        if (isMounted) {
          setTags(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTags();

    return () => {
      isMounted = false;
    };
  }, []);

  return { tags, loading, error };
}
