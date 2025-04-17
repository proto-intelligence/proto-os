'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useOrganizationMembershipsControllerFindAll } from '@/hooks/backend';

export function useSettingsData() {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [formData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Fetch organization memberships
  const { 
    data: memberships, 
    isLoading: isMembershipsLoading,
    error: membershipsError
  } = useOrganizationMembershipsControllerFindAll();

  // Simple loading state
  const isLoading = !isClerkLoaded || isMembershipsLoading;

  // Update form data when Clerk user is loaded
  if (isClerkLoaded && clerkUser) {
    formData.firstName = clerkUser.firstName || "";
    formData.lastName = clerkUser.lastName || "";
    formData.email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
  }

  return {
    clerkUser,
    formData,
    memberships,
    isLoading,
    membershipsError
  };
} 