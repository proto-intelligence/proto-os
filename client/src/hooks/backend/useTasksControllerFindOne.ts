import { useQuery } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';
import { Task } from '@/lib/api/backend/models/Task';

export function useTasksControllerFindOne(id: string) {
  return useQuery<Task>({
    queryKey: ['tasks', id],
    queryFn: () => TasksService.tasksControllerFindOne(id),
    enabled: !!id,
  });
} 