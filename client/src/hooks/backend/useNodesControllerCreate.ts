import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NodesService } from '@/lib/api/backend/services/NodesService';
import { CreateWorkflowNodeDto } from '@/lib/api/backend/models/CreateWorkflowNodeDto';

export function useNodesControllerCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkflowNodeDto) => NodesService.nodesControllerCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nodes'] });
    },
  });
} 