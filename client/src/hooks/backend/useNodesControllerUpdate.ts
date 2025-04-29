import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NodesService } from '@/lib/api/backend/services/NodesService';
import { UpdateWorkflowNodeDto } from '@/lib/api/backend/models/UpdateWorkflowNodeDto';

export function useNodesControllerUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkflowNodeDto }) =>
      NodesService.nodesControllerUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nodes'] });
    },
  });
} 