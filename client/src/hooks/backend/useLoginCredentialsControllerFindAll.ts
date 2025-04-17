import { useQuery } from '@tanstack/react-query';
import { LoginCredentialsService } from '@/lib/api/backend/services/LoginCredentialsService';

export function useLoginCredentialsControllerFindAll(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['loginCredentialsControllerFindAll'],
    queryFn: () => LoginCredentialsService.loginCredentialsControllerFindAll(),
    enabled: options?.enabled !== false, // Default to true if not specified
  });
} 