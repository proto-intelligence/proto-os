import { useQuery } from '@tanstack/react-query';
import { UsersService } from '@/lib/api/backend/services/UsersService';

export function useUsersControllerFindOne(id: string) {
  return useQuery({
    queryKey: ['usersControllerFindOne', id],
    queryFn: () => UsersService.usersControllerFindOne(id),
    enabled: !!id,
  });
} 