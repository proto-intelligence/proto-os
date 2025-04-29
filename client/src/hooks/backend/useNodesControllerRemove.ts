import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NodesService } from '@/lib/api/backend/services/NodesService';

export function useNodesControllerRemove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => NodesService.nodesControllerRemove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nodes'] });
    },
  });
} 