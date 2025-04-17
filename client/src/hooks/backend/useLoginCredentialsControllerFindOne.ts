import { useQuery } from '@tanstack/react-query';
import { LoginCredentialsService } from '@/lib/api/backend/services/LoginCredentialsService';

export function useLoginCredentialsControllerFindOne(id: string) {
  return useQuery({
    queryKey: ['loginCredentialsControllerFindOne', id],
    queryFn: () => LoginCredentialsService.loginCredentialsControllerFindOne(id),
    enabled: !!id,
  });
} 