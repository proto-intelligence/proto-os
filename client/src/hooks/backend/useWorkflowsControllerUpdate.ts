import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';
import { UpdateWorkflowDto } from '@/lib/api/backend/models/UpdateWorkflowDto';

export function useWorkflowsControllerUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkflowDto }) =>
      WorkflowsService.workflowsControllerUpdate(id, data),
    onSuccess: (_data, variables) => {
      // Invalidate both the workflow list and the specific workflow detail
      queryClient.invalidateQueries({ queryKey: ['workflowsControllerSearch'] });
      queryClient.invalidateQueries({ queryKey: ['workflowsControllerFindOne', variables.id] });
    },
  });
} 