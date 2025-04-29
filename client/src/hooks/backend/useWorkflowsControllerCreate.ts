import { useMutation } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';
import { CreateWorkflowDto } from '@/lib/api/backend/models/CreateWorkflowDto';

export function useWorkflowsControllerCreate() {
  return useMutation({
    mutationFn: (data: CreateWorkflowDto) => WorkflowsService.workflowsControllerCreate(data),
  });
} 