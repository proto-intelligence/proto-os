import { useMutation } from '@tanstack/react-query';
import { LoginPermissionsService } from '@/lib/api/backend/services/LoginPermissionsService';
import type { UpdateLoginPermissionDto } from '@/lib/api/backend/models/UpdateLoginPermissionDto';

export function useLoginPermissionsControllerUpdate() {
  return useMutation({
    mutationKey: ['loginPermissionsControllerUpdate'],
    mutationFn: ({ id, data }: { id: string; data: UpdateLoginPermissionDto }) => 
      LoginPermissionsService.loginPermissionsControllerUpdate(id, data),
  });
} 