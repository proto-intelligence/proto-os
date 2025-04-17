import { useMutation } from '@tanstack/react-query';
import { UsersService } from '@/lib/api/backend/services/UsersService';
import type { UpdateUserDto } from '@/lib/api/backend/models/UpdateUserDto';

export function useUsersControllerUpdate() {
  return useMutation({
    mutationKey: ['usersControllerUpdate'],
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) => 
      UsersService.usersControllerUpdate(id, data),
  });
} 