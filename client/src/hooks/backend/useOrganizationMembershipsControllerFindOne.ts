import { useQuery } from '@tanstack/react-query';
import { OrganizationMembershipsService } from '@/lib/api/backend/services/OrganizationMembershipsService';

export function useOrganizationMembershipsControllerFindOne(id: string) {
  return useQuery({
    queryKey: ['organizationMembershipsControllerFindOne', id],
    queryFn: () => OrganizationMembershipsService.organizationMembershipsControllerFindOne(id),
    enabled: !!id,
  });
} 