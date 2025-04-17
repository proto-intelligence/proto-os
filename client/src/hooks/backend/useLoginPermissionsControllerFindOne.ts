import { useQuery } from '@tanstack/react-query';
import { LoginPermissionsService } from '@/lib/api/backend/services/LoginPermissionsService';

export function useLoginPermissionsControllerFindOne(id: string) {
  return useQuery({
    queryKey: ['loginPermissionsControllerFindOne', id],
    queryFn: () => LoginPermissionsService.loginPermissionsControllerFindOne(id),
    enabled: !!id,
  });
} 