import { useQuery } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';
import { Task } from '@/lib/api/backend/models/Task';

interface SearchParams {
  search?: string;
  page?: number;
  limit?: number;
}

interface SearchResponse {
  data: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useTasksControllerSearch(params: SearchParams = {}) {
  return useQuery<SearchResponse>({
    queryKey: ['tasks', 'search', params],
    queryFn: () => TasksService.tasksControllerSearch(
      params.search,
      undefined, // type
      undefined, // urgency
      undefined, // workflowId
      params.page?.toString() ?? '1',
      params.limit?.toString() ?? '10',
    ),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
} 