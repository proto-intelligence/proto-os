import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EdgesService } from '@/lib/api/backend/services/EdgesService';
import { UpdateEdgeDto } from '@/lib/api/backend/models/UpdateEdgeDto';

export function useEdgesControllerUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEdgeDto }) =>
      EdgesService.edgesControllerUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['edges'] });
    },
  });
} 