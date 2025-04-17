import { useMutation } from '@tanstack/react-query';
import { OrganizationMembershipsService } from '@/lib/api/backend/services/OrganizationMembershipsService';

export function useOrganizationMembershipsControllerRemove() {
  return useMutation({
    mutationKey: ['organizationMembershipsControllerRemove'],
    mutationFn: (id: string) => OrganizationMembershipsService.organizationMembershipsControllerRemove(id),
  });
} 