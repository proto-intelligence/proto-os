import { useQuery } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';

export function useWorkflowsControllerFindAll() {
  return useQuery({
    queryKey: ['workflowsControllerFindAll'],
    queryFn: () => WorkflowsService.workflowsControllerFindAll(),
  });
} 