import { useMutation } from '@tanstack/react-query';
import { LoginPermissionsService } from '@/lib/api/backend/services/LoginPermissionsService';

export function useLoginPermissionsControllerRemove() {
  return useMutation({
    mutationKey: ['loginPermissionsControllerRemove'],
    mutationFn: (id: string) => LoginPermissionsService.loginPermissionsControllerRemove(id),
  });
} 