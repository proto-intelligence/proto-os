import { useQuery } from '@tanstack/react-query';
import { OrganizationsService } from '@/lib/api/backend/services/OrganizationsService';

export function useOrganizationsControllerFindByName(name: string) {
  return useQuery({
    queryKey: ['organizationsControllerFindByName', name],
    queryFn: () => OrganizationsService.organizationsControllerFindByName(name),
    enabled: !!name,
  });
} 