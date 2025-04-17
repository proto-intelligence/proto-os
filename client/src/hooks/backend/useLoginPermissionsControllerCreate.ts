import { useMutation } from '@tanstack/react-query';
import { LoginPermissionsService } from '@/lib/api/backend/services/LoginPermissionsService';
import type { CreateLoginPermissionDto } from '@/lib/api/backend/models/CreateLoginPermissionDto';

export function useLoginPermissionsControllerCreate() {
  return useMutation({
    mutationKey: ['loginPermissionsControllerCreate'],
    mutationFn: (data: CreateLoginPermissionDto) => 
      LoginPermissionsService.loginPermissionsControllerCreate(data),
  });
} 