import { useMutation } from '@tanstack/react-query';
import { UsersService } from '@/lib/api/backend/services/UsersService';
import type { CreateUserDto } from '@/lib/api/backend/models/CreateUserDto';

export function useUsersControllerCreate() {
  return useMutation({
    mutationKey: ['usersControllerCreate'],
    mutationFn: (data: CreateUserDto) => UsersService.usersControllerCreate(data),
  });
} 