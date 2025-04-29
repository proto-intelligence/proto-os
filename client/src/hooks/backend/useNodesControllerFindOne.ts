import { useQuery } from '@tanstack/react-query';
import { NodesService } from '@/lib/api/backend/services/NodesService';

export function useNodesControllerFindOne(id: string) {
  return useQuery({
    queryKey: ['nodes', id],
    queryFn: () => NodesService.nodesControllerFindOne(id),
    enabled: !!id,
  });
} 