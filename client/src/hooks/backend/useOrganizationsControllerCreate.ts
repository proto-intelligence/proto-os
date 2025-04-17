import { useMutation } from '@tanstack/react-query';
import { OrganizationsService } from '@/lib/api/backend/services/OrganizationsService';
import type { CreateOrganizationDto } from '@/lib/api/backend/models/CreateOrganizationDto';

export function useOrganizationsControllerCreate() {
  return useMutation({
    mutationKey: ['organizationsControllerCreate'],
    mutationFn: (data: CreateOrganizationDto) => OrganizationsService.organizationsControllerCreate(data),
  });
} 