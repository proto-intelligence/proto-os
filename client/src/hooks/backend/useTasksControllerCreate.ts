import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';
import { CreateTaskDto } from '@/lib/api/backend/models/CreateTaskDto';

export function useTasksControllerCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => TasksService.tasksControllerCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
} 