import { useQuery } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';

export function useTasksControllerFindOne(id: string) {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => TasksService.tasksControllerFindOne(id),
    enabled: !!id,
  });
} 