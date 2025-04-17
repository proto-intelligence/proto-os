import { useQuery } from '@tanstack/react-query';
import { OrganizationsService } from '@/lib/api/backend/services/OrganizationsService';

export function useOrganizationsControllerFindOne(id: string) {
  return useQuery({
    queryKey: ['organizationsControllerFindOne', id],
    queryFn: () => OrganizationsService.organizationsControllerFindOne(id),
    enabled: !!id,
  });
} 