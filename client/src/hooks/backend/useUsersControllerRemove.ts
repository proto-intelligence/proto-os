import { useMutation } from '@tanstack/react-query';
import { UsersService } from '@/lib/api/backend/services/UsersService';

export function useUsersControllerRemove() {
  return useMutation({
    mutationKey: ['usersControllerRemove'],
    mutationFn: (id: string) => UsersService.usersControllerRemove(id),
  });
} 