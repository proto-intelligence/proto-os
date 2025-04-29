import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EdgesService } from '@/lib/api/backend/services/EdgesService';
import { CreateEdgeDto } from '@/lib/api/backend/models/CreateEdgeDto';

export function useEdgesControllerCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEdgeDto) => EdgesService.edgesControllerCreate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['edges'] });
    },
  });
} 