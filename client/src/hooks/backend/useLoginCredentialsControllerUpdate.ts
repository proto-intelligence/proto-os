import { useMutation } from '@tanstack/react-query';
import { LoginCredentialsService } from '@/lib/api/backend/services/LoginCredentialsService';
import type { UpdateLoginCredentialDto } from '@/lib/api/backend/models/UpdateLoginCredentialDto';

export function useLoginCredentialsControllerUpdate() {
  return useMutation({
    mutationKey: ['loginCredentialsControllerUpdate'],
    mutationFn: ({ id, data }: { id: string; data: UpdateLoginCredentialDto }) => 
      LoginCredentialsService.loginCredentialsControllerUpdate(id, data),
  });
} 