import { useUser, useOrganization } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';

export const useClerkData = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { organization, isLoaded: isOrgLoaded } = useOrganization();

  const { data: clerkData, isLoading } = useQuery({
    queryKey: ['clerkData', organization?.id],
    queryFn: () => ({
      userId: user?.id,
      organizationId: organization?.id,
      user,
      organization
    }),
    enabled: isUserLoaded && isOrgLoaded,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return {
    ...clerkData,
    isLoaded: !isLoading && isUserLoaded && isOrgLoaded,
  };
}; 