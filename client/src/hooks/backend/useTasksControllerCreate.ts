import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TasksService } from '@/lib/api/backend/services/TasksService';
import { CreateTaskDto } from '@/lib/api/backend/models/CreateTaskDto';
import { Task } from '@/lib/api/backend/models/Task';

export function useTasksControllerCreate() {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, CreateTaskDto>({
    mutationFn: (data: CreateTaskDto) => TasksService.tasksControllerCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'], exact: false });
    },
  });
} 