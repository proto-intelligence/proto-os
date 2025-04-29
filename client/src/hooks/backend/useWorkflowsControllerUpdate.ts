import { useMutation } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';
import { UpdateWorkflowDto } from '@/lib/api/backend/models/UpdateWorkflowDto';

export function useWorkflowsControllerUpdate() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkflowDto }) =>
      WorkflowsService.workflowsControllerUpdate(id, data),
  });
} 