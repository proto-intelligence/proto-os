import { useMutation } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';

export function useWorkflowsControllerRemove() {
  return useMutation({
    mutationFn: (id: string) => WorkflowsService.workflowsControllerRemove(id),
  });
} 