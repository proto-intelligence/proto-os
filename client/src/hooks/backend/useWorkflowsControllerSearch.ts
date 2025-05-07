import { useQuery } from '@tanstack/react-query';
import { WorkflowsService } from '@/lib/api/backend/services/WorkflowsService';

interface SearchParams {
  search?: string;
  tags?: string[];
  workflowType?: 'dag' | 'acyclic' | 'cron';
  createdBy?: string;
  organizationId?: string;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export function useWorkflowsControllerSearch(params: SearchParams = {}) {
  const processedParams = {
    ...params,
    page: params.page || 1,
    limit: params.limit || 10
  };
  
  return useQuery({
    queryKey: ['workflowsControllerSearch', processedParams],
    queryFn: async () => {
      const result = await WorkflowsService.workflowsControllerSearch(
        processedParams.search,
        processedParams.tags,
        processedParams.workflowType,
        processedParams.createdBy,
        processedParams.organizationId,
        processedParams.createdFrom,
        processedParams.createdTo,
        processedParams.page,
        processedParams.limit,
        processedParams.sortBy,
        processedParams.sortOrder
      );
      return result;
    },
    select: (data) => {
      if (data && Array.isArray(data.data)) {
        return { ...data, items: data.data };
      }
      return data;
    },
  });
} 