'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { 
  useUsersControllerFindByClerkId,
  useOrganizationMembershipsControllerFindAll,
  useLoginCredentialsControllerFindAll,
  useLoginPermissionsControllerFindAll
} from '@/hooks/backend';

export function useSettingsData() {
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch user data from backend
  const { data: userData, isLoading: isUserLoading } = useUsersControllerFindByClerkId(
    isClient && clerkUser?.id ? clerkUser.id : ""
  );

  // Fetch organization memberships
  const { data: memberships, isLoading: isMembershipsLoading } = useOrganizationMembershipsControllerFindAll();

  // Fetch login credentials
  const { data: credentials, isLoading: isCredentialsLoading } = useLoginCredentialsControllerFindAll();

  // Fetch login permissions
  const { data: permissions, isLoading: isPermissionsLoading } = useLoginPermissionsControllerFindAll();

  // Update form data when user data is loaded
  useEffect(() => {
    if (isClient && userData) {
      setFormData({
        firstName: userData.first_name || clerkUser?.firstName || "",
        lastName: userData.last_name || clerkUser?.lastName || "",
        email: userData.email || clerkUser?.emailAddresses?.[0]?.emailAddress || "",
      });
    } else if (isClient && isClerkLoaded && clerkUser) {
      setFormData({
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
      });
    }
  }, [userData, clerkUser, isClerkLoaded, isClient]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving settings:", formData);
    // Show success message
  };

  // Loading state
  const isLoading = isUserLoading || isMembershipsLoading || isCredentialsLoading || isPermissionsLoading || !isClerkLoaded || !isClient;

  return {
    clerkUser,
    formData,
    memberships,
    credentials,
    permissions,
    isLoading,
    handleInputChange,
    handleSave
  };
} 