import { useQuery } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';

export function useWorkflowsControllerFindOne(id: string) {
  return useQuery({
    queryKey: ['workflowsControllerFindOne', id],
    queryFn: () => WorkflowsService.workflowsControllerFindOne(id),
    enabled: !!id,
  });
} 