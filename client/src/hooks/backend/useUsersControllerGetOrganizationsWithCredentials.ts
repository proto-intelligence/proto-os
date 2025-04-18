import { useQuery } from '@tanstack/react-query';
import { UsersService } from '@/lib/api/backend/services/UsersService';

export function useUsersControllerGetOrganizationsWithCredentials(userId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['usersControllerGetOrganizationsWithCredentials', userId],
    queryFn: () => UsersService.usersControllerGetOrganizationsWithCredentials(userId),
    enabled: !!userId && options?.enabled !== false,
  });
} 