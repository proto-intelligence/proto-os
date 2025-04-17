import { useQuery } from '@tanstack/react-query';
import { LoginPermissionsService } from '@/lib/api/backend/services/LoginPermissionsService';

export function useLoginPermissionsControllerFindAll(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['loginPermissionsControllerFindAll'],
    queryFn: () => LoginPermissionsService.loginPermissionsControllerFindAll(),
    enabled: options?.enabled !== false, // Default to true if not specified
  });
} 