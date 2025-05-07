import { useMutation, useQueryClient } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';
import { CreateWorkflowDto } from '@/lib/api/backend/models/CreateWorkflowDto';

export function useWorkflowsControllerCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkflowDto) => WorkflowsService.workflowsControllerCreate(data),
    onSuccess: () => {
      // Invalidate and refetch the workflows search query
      queryClient.invalidateQueries({ queryKey: ['workflowsControllerSearch'] });
    },
  });
} 