import { useMutation } from '@tanstack/react-query';
import { OrganizationMembershipsService } from '@/lib/api/backend/services/OrganizationMembershipsService';
import type { CreateOrganizationMembershipDto } from '@/lib/api/backend/models/CreateOrganizationMembershipDto';

export function useOrganizationMembershipsControllerCreate() {
  return useMutation({
    mutationKey: ['organizationMembershipsControllerCreate'],
    mutationFn: (data: CreateOrganizationMembershipDto) => 
      OrganizationMembershipsService.organizationMembershipsControllerCreate(data),
  });
} 