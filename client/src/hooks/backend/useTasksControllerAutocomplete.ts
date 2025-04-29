import { useQuery } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';

export function useTasksControllerAutocomplete(q: string, limit: number = 5) {
  return useQuery({
    queryKey: ['tasksControllerAutocomplete', q, limit],
    queryFn: () => TasksService.tasksControllerAutocomplete(q, limit),
    enabled: q.length > 0,
  });
} 