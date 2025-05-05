import { useQuery } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';
import { Task } from '@/lib/api/backend/models/Task';

interface SearchParams {
  search?: string;
  type?: string;
  urgency?: string;
  workflowId?: string;
  createdBy?: string;
  organizationId?: string;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

interface SearchResponse {
  data: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useTasksControllerSearch(params: SearchParams = {}) {
  // Ensure defaults are set
  const processedParams = {
    ...params,
    page: params.page || 1,
    limit: params.limit || 10,
    sortBy: params.sortBy || 'created_at',
    sortOrder: params.sortOrder || 'DESC'
  };
  
  console.log('useTasksControllerSearch - Search params:', processedParams);
  
  return useQuery<SearchResponse>({
    queryKey: ['tasks', 'search', processedParams],
    queryFn: async () => {
      console.log('useTasksControllerSearch - Making API call with params:', processedParams);
      
      const response = await TasksService.tasksControllerSearch(
        processedParams.search,
        processedParams.type,
        processedParams.urgency,
        processedParams.workflowId,
        processedParams.createdBy,
        processedParams.organizationId,
        processedParams.createdFrom,
        processedParams.createdTo,
        processedParams.page,
        processedParams.limit,
        processedParams.sortBy,
        processedParams.sortOrder
      );
      
      console.log('useTasksControllerSearch - API response:', response);
      return response;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
} 