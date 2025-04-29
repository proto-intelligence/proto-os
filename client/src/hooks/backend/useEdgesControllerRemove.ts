import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EdgesService } from '@/lib/api/backend/services/EdgesService';

export function useEdgesControllerRemove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => EdgesService.edgesControllerRemove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['edges'] });
    },
  });
} 