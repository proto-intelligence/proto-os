import { useQuery } from '@tanstack/react-query';
import { LoginPermissionsService } from '@/lib/api/backend/services/LoginPermissionsService';

export function useLoginPermissionsControllerFindAll() {
  return useQuery({
    queryKey: ['loginPermissionsControllerFindAll'],
    queryFn: () => LoginPermissionsService.loginPermissionsControllerFindAll(),
  });
} 