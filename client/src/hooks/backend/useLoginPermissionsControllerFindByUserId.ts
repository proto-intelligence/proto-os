import { useQuery } from '@tanstack/react-query';
import { LoginPermissionsService } from '@/lib/api/backend/services/LoginPermissionsService';

export function useLoginPermissionsControllerFindByUserId(userId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['loginPermissionsControllerFindByUserId', userId],
    queryFn: () => LoginPermissionsService.loginPermissionsControllerFindByUserId(userId),
    enabled: !!userId && options?.enabled !== false,
  });
} 