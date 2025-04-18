import { useQuery } from '@tanstack/react-query';
import { OrganizationMembershipsService } from '@/lib/api/backend/services/OrganizationMembershipsService';

export function useOrganizationMembershipsControllerFindByUserId(userId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['organizationMembershipsControllerFindByUserId', userId],
    queryFn: () => OrganizationMembershipsService.organizationMembershipsControllerFindByUserId(userId),
    enabled: !!userId && options?.enabled !== false,
  });
} 