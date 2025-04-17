import { useQuery } from '@tanstack/react-query';
import { UsersService } from '@/lib/api/backend/services/UsersService';

export function useUsersControllerFindAll() {
  return useQuery({
    queryKey: ['usersControllerFindAll'],
    queryFn: () => UsersService.usersControllerFindAll(),
  });
} 