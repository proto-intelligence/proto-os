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
  // Ensure page is always a number and defaults to 1
  const processedParams = {
    ...params,
    page: params.page || 1,
    limit: params.limit || 10
  };
  
  console.log('Processed search params:', processedParams);
  
  return useQuery({
    queryKey: ['workflowsControllerSearch', processedParams],
    queryFn: async () => {
      console.log('Making API request with params:', processedParams);
      try {
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
        console.log('API response:', result);
        return result;
      } catch (error) {
        console.error('API error:', error);
        throw error;
      }
    },
    select: (data) => {
      console.log('Data before transformation:', data);
      if (data && Array.isArray(data.data)) {
        const transformed = { ...data, items: data.data };
        console.log('Transformed data:', transformed);
        return transformed;
      }
      return data;
    },
  });
} 