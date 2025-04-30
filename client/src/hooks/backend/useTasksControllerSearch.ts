import { useQuery } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';

interface SearchParams {
  search?: string;
  type?: 'administrative' | 'clinical' | 'technical';
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  workflowId?: string;
  createdFrom?: string;
  createdTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export function useTasksControllerSearch(params: SearchParams = {}) {
  return useQuery({
    queryKey: ['tasks', 'list', params],
    queryFn: () => TasksService.tasksControllerSearch(
      params.search,
      params.type,
      params.urgency,
      params.workflowId,
      params.createdFrom,
      params.createdTo,
      params.page,
      params.limit,
      params.sortBy,
      params.sortOrder
    ),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
} 