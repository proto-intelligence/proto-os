import { useQuery } from '@tanstack/react-query';
import { NodesService } from '@/lib/api/backend/services/NodesService';

export function useNodesControllerFindAll() {
  return useQuery({
    queryKey: ['nodes'],
    queryFn: () => NodesService.nodesControllerFindAll(),
  });
} 