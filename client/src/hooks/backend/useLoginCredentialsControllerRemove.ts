import { useMutation } from '@tanstack/react-query';
import { LoginCredentialsService } from '@/lib/api/backend/services/LoginCredentialsService';

export function useLoginCredentialsControllerRemove() {
  return useMutation({
    mutationKey: ['loginCredentialsControllerRemove'],
    mutationFn: (id: string) => LoginCredentialsService.loginCredentialsControllerRemove(id),
  });
} 