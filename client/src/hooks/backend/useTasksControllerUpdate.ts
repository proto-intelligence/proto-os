import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';
import { UpdateTaskDto } from '@/lib/api/backend/models/UpdateTaskDto';

export function useTasksControllerUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) =>
      TasksService.tasksControllerUpdate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', id] });
    },
  });
} 