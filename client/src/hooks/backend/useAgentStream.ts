import { useChat } from '@ai-sdk/react';
import { AgentService } from '@/lib/api/backend/services/AgentService';

interface UseAgentStreamOptions {
  id?: string;
  initialMessages?: any[];
  onError?: (error: Error) => void;
  onFinish?: (message: any) => void;
}

export function useAgentStream({
  id,
  initialMessages = [],
  onError,
  onFinish,
}: UseAgentStreamOptions = {}) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
    stop,
    setMessages,
  } = useChat({
    id,
    initialMessages,
    api: '/agent/stream', // This will be handled by our custom fetch
    onError,
    onFinish,
    fetch: async (url, options) => {
      try {
        // Use the AgentService to make the request
        const response = await AgentService.agentControllerStream();
        return new Response(JSON.stringify(response), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred');
      }
    },
  });

  // Custom submit handler that uses AgentService
  const handleCustomSubmit = async (e?: { preventDefault?: () => void }) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    if (!input.trim()) return;

    try {
      const response = await AgentService.agentControllerStream();
      append({
        role: 'assistant',
        content: response.data || '',
      });
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('An error occurred'));
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleCustomSubmit,
    isLoading,
    error,
    append,
    stop,
    setMessages,
  };
}
