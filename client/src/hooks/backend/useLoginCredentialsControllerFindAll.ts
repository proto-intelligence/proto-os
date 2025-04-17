import { useQuery } from '@tanstack/react-query';
import { LoginCredentialsService } from '@/lib/api/backend/services/LoginCredentialsService';

export function useLoginCredentialsControllerFindAll() {
  return useQuery({
    queryKey: ['loginCredentialsControllerFindAll'],
    queryFn: () => LoginCredentialsService.loginCredentialsControllerFindAll(),
  });
} 