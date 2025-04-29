import { useQuery } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';

export function useWorkflowsControllerGetFilters() {
  return useQuery({
    queryKey: ['workflowsControllerGetFilters'],
    queryFn: () => WorkflowsService.workflowsControllerGetFilters(),
  });
} 