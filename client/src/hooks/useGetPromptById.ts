// hooks/useGetPromptById.ts
import { useState, useEffect } from "react";
import { PromptsService, Prompt } from "@/lib/api/client";

export function useGetPromptById(id: string | null) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPrompt = async () => {
      setLoading(true);
      try {
        const result = await PromptsService.promptsControllerFindOne(id);
        setPrompt(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [id]);

  return { prompt, loading, error };
}
