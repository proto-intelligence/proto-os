import { useQuery } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';

export function useWorkflowsControllerAutocomplete(q: string, limit: number = 5) {
  return useQuery({
    queryKey: ['workflowsControllerAutocomplete', q, limit],
    queryFn: () => WorkflowsService.workflowsControllerAutocomplete(q, limit),
    enabled: q.length > 0,
  });
} 