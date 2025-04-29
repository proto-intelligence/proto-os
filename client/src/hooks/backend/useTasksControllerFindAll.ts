import { useQuery } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';

export function useTasksControllerFindAll() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => TasksService.tasksControllerFindAll(),
  });
} 