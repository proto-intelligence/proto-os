import { useState, useCallback } from 'react';
import { PromptsService, UpdatePromptDto, Prompt } from '@/lib/api/client';

export function useUpdatePrompt() {
  const [data, setData] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updatePrompt = useCallback(async (id: string, requestBody: UpdatePromptDto) => {
    setLoading(true);
    setError(null);

    try {
      const response = await PromptsService.promptsControllerUpdate(id, requestBody);
      setData(response);
      return response;
    } catch (err) {
      setError(err as Error);
      console.error('Failed to update prompt:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    updatePrompt,
  };
}