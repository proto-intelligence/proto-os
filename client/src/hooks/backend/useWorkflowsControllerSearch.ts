import { useQuery } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';

interface SearchParams {
  search?: string;
  tags?: string[];
  workflowType?: 'dag' | 'acyclic' | 'cron';
  createdBy?: string;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export function useWorkflowsControllerSearch(params: SearchParams = {}) {
  return useQuery({
    queryKey: ['workflowsControllerSearch', params],
    queryFn: () => WorkflowsService.workflowsControllerSearch(
      params.search,
      params.tags,
      params.workflowType,
      params.createdBy,
      params.createdFrom,
      params.createdTo,
      params.page,
      params.limit,
      params.sortBy,
      params.sortOrder
    ),
  });
} 