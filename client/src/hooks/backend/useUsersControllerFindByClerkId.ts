import { useQuery } from '@tanstack/react-query';
import { UsersService } from '@/lib/api/backend/services/UsersService';

export function useUsersControllerFindByClerkId(clerkId: string) {
  return useQuery({
    queryKey: ['usersControllerFindByClerkId', clerkId],
    queryFn: () => UsersService.usersControllerFindByClerkId(clerkId),
    enabled: !!clerkId,
  });
} 