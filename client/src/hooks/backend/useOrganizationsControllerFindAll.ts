import { useQuery } from '@tanstack/react-query';
import { OrganizationsService } from '@/lib/api/backend/services/OrganizationsService';

export function useOrganizationsControllerFindAll() {
  return useQuery({
    queryKey: ['organizationsControllerFindAll'],
    queryFn: () => OrganizationsService.organizationsControllerFindAll(),
  });
} 