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
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine if we're ready to make API calls
  const isReadyForApiCalls = isClient && isClerkLoaded && !!clerkUser?.id;
  
  // Fetch user data from backend - only when we have a clerk ID
  const { 
    data: userData, 
    isLoading: isUserLoading,
    error: userError
  } = useUsersControllerFindByClerkId(
    clerkUser?.id || "",
    { enabled: isReadyForApiCalls }
  );

  // Fetch organization memberships - only when we have a clerk ID
  const { 
    data: memberships, 
    isLoading: isMembershipsLoading,
    error: membershipsError
  } = useOrganizationMembershipsControllerFindAll(
    { enabled: isReadyForApiCalls }
  );

  // Fetch login credentials - only when we have a clerk ID
  const { 
    data: credentials, 
    isLoading: isCredentialsLoading,
    error: credentialsError
  } = useLoginCredentialsControllerFindAll(
    { enabled: isReadyForApiCalls }
  );

  // Fetch login permissions - only when we have a clerk ID
  const { 
    data: permissions, 
    isLoading: isPermissionsLoading,
    error: permissionsError
  } = useLoginPermissionsControllerFindAll(
    { enabled: isReadyForApiCalls }
  );

  // Track errors
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    if (userError) newErrors.user = 'Failed to load user data';
    if (membershipsError) newErrors.memberships = 'Failed to load organization memberships';
    if (credentialsError) newErrors.credentials = 'Failed to load login credentials';
    if (permissionsError) newErrors.permissions = 'Failed to load login permissions';
    
    setErrors(newErrors);
  }, [userError, membershipsError, credentialsError, permissionsError]);

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

  // Loading state - we're loading if:
  // 1. We're not on the client yet
  // 2. Clerk is not loaded yet
  // 3. We don't have a clerk ID yet
  // 4. Any of the API calls are still loading
  const isLoading = !isClient || 
                   !isClerkLoaded || 
                   !isReadyForApiCalls || 
                   isUserLoading || 
                   isMembershipsLoading || 
                   isCredentialsLoading || 
                   isPermissionsLoading;

  return {
    clerkUser,
    formData,
    memberships,
    credentials,
    permissions,
    isLoading,
    errors,
    handleInputChange,
    handleSave
  };
} 