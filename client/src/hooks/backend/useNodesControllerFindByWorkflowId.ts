import { useQuery } from '@tanstack/react-query';
import { NodesService } from '@/lib/api/backend/services/NodesService';

export function useNodesControllerFindByWorkflowId(workflowId: string) {
  return useQuery({
    queryKey: ['nodes', 'workflow', workflowId],
    queryFn: () => NodesService.nodesControllerFindByWorkflowId(workflowId),
    enabled: !!workflowId,
  });
} 