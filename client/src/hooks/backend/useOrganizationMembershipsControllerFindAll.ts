import { useQuery } from '@tanstack/react-query';
import { OrganizationMembershipsService } from '@/lib/api/backend/services/OrganizationMembershipsService';

export function useOrganizationMembershipsControllerFindAll(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['organizationMembershipsControllerFindAll'],
    queryFn: () => OrganizationMembershipsService.organizationMembershipsControllerFindAll(),
    enabled: options?.enabled !== false, // Default to true if not specified
  });
} 