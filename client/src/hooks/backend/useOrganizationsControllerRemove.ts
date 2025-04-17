import { useMutation } from '@tanstack/react-query';
import { OrganizationsService } from '@/lib/api/backend/services/OrganizationsService';

export function useOrganizationsControllerRemove() {
  return useMutation({
    mutationKey: ['organizationsControllerRemove'],
    mutationFn: (id: string) => OrganizationsService.organizationsControllerRemove(id),
  });
} 