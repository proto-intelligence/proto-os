import { useMutation } from '@tanstack/react-query';
import { OrganizationsService } from '@/lib/api/backend/services/OrganizationsService';
import type { UpdateOrganizationDto } from '@/lib/api/backend/models/UpdateOrganizationDto';

export function useOrganizationsControllerUpdate() {
  return useMutation({
    mutationKey: ['organizationsControllerUpdate'],
    mutationFn: ({ id, data }: { id: string; data: UpdateOrganizationDto }) => 
      OrganizationsService.organizationsControllerUpdate(id, data),
  });
} 