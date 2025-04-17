import { useMutation } from '@tanstack/react-query';
import { LoginCredentialsService } from '@/lib/api/backend/services/LoginCredentialsService';
import type { CreateLoginCredentialDto } from '@/lib/api/backend/models/CreateLoginCredentialDto';

export function useLoginCredentialsControllerCreate() {
  return useMutation({
    mutationKey: ['loginCredentialsControllerCreate'],
    mutationFn: (data: CreateLoginCredentialDto) => 
      LoginCredentialsService.loginCredentialsControllerCreate(data),
  });
} 