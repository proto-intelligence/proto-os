import { useQuery } from '@tanstack/react-query';
import { EdgesService } from '@/lib/api/backend/services/EdgesService';

export function useEdgesControllerFindByWorkflow(workflowId: string) {
  return useQuery({
    queryKey: ['edges', 'workflow', workflowId],
    queryFn: () => EdgesService.edgesControllerFindByWorkflow(workflowId),
    enabled: !!workflowId,
  });
} 