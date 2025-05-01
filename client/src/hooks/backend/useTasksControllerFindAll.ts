import { useQuery } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';
import { Task } from '@/lib/api/backend/models/Task';

export function useTasksControllerFindAll() {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: () => TasksService.tasksControllerFindAll(),
  });
} 