import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';

export function useTasksControllerRemove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => TasksService.tasksControllerRemove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', id] });
    },
  });
} 