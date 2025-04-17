import { useQuery } from '@tanstack/react-query';
import { OrganizationMembershipsService } from '@/lib/api/backend/services/OrganizationMembershipsService';

export function useOrganizationMembershipsControllerFindAll() {
  return useQuery({
    queryKey: ['organizationMembershipsControllerFindAll'],
    queryFn: () => OrganizationMembershipsService.organizationMembershipsControllerFindAll(),
  });
} 