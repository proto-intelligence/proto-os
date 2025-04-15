import { useState, useCallback } from 'react';
import { PromptsService, CreatePromptDto, Prompt } from '@/lib/api/client';

export function useCreatePrompt() {
  const [data, setData] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createPrompt = useCallback(async (requestBody: CreatePromptDto) => {
    setLoading(true);
    setError(null);

    try {
      const response = await PromptsService.promptsControllerCreate(requestBody);
      setData(response);
      return response;
    } catch (err) {
      setError(err as Error);
      console.error('Failed to create prompt:', err);
      throw err; // rethrow if caller needs to handle it too
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    createPrompt,
  };
}
