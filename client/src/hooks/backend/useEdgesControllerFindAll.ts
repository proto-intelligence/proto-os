import { useQuery } from '@tanstack/react-query';
import { EdgesService } from '@/lib/api/backend/services/EdgesService';

export function useEdgesControllerFindAll() {
  return useQuery({
    queryKey: ['edges'],
    queryFn: () => EdgesService.edgesControllerFindAll(),
  });
} 