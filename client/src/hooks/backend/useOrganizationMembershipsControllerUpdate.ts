import { useMutation } from '@tanstack/react-query';
import { OrganizationMembershipsService } from '@/lib/api/backend/services/OrganizationMembershipsService';
import type { UpdateOrganizationMembershipDto } from '@/lib/api/backend/models/UpdateOrganizationMembershipDto';

export function useOrganizationMembershipsControllerUpdate() {
  return useMutation({
    mutationKey: ['organizationMembershipsControllerUpdate'],
    mutationFn: ({ id, data }: { id: string; data: UpdateOrganizationMembershipDto }) => 
      OrganizationMembershipsService.organizationMembershipsControllerUpdate(id, data),
  });
} 