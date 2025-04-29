import { useQuery } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';

export function useTasksControllerGetFilters() {
  return useQuery({
    queryKey: ['tasksControllerGetFilters'],
    queryFn: () => TasksService.tasksControllerGetFilters(),
  });
} 