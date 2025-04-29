import { useQuery } from '@tanstack/react-query';
import { EdgesService } from '@/lib/api/backend/services/EdgesService';

export function useEdgesControllerFindOne(id: string) {
  return useQuery({
    queryKey: ['edges', id],
    queryFn: () => EdgesService.edgesControllerFindOne(id),
    enabled: !!id,
  });
} 