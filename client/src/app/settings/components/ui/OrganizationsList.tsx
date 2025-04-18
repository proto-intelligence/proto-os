"use client";

import React from "react";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";
import { Badge } from "@/ui/components/Badge";
import { FeatherSettings, FeatherEye } from "@subframe/core";
import { useUser } from "@clerk/nextjs";
import { 
  useUsersControllerFindByClerkId, 
  useOrganizationMembershipsControllerFindByUserId,
  useOrganizationsControllerFindOne
} from "@/hooks/backend";

interface OrganizationsListProps {
  onNavigateToLoginAccess: () => void;
}

// Define types for our data
interface OrganizationMembership {
  id: string;
  organization_id: string;
  role: string;
  created_at: string;
}

interface Organization {
  id: string;
  name: string;
  logo_url?: string;
}

// OrganizationItem component to handle individual organization display
function OrganizationItem({ 
  membership, 
  organization, 
  onNavigateToLoginAccess 
}: { 
  membership: OrganizationMembership; 
  organization: Organization | undefined; 
  onNavigateToLoginAccess: () => void;
}) {
  const organizationName = organization?.name || "Unknown Organization";
  const organizationAvatar = organization?.logo_url || "";
  
  return (
    <div
      className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4"
    >
      <Avatar size="large" image={organizationAvatar} square={true}>
        {organizationName[0] || "O"}
      </Avatar>
      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
        <div className="flex w-full items-center gap-2">
          <span className="text-body-bold font-body-bold text-default-font">
            {organizationName}
          </span>
          <Badge variant={membership.role === "admin" ? "brand" : "neutral"}>
            {membership.role || "Member"}
          </Badge>
        </div>
        <span className="text-caption font-caption text-subtext-color">
          Joined {new Date(membership.created_at).toLocaleDateString()}
        </span>
      </div>
      <Button
        className="h-auto w-auto flex-none self-stretch"
        variant="brand-secondary"
        icon={membership.role === "admin" ? <FeatherSettings /> : <FeatherEye />}
        onClick={onNavigateToLoginAccess}
      >
        {membership.role === "admin" ? "Manage Access" : "View Access"}
      </Button>
    </div>
  );
}

export function OrganizationsList({ onNavigateToLoginAccess }: OrganizationsListProps) {
  const { user } = useUser();
  const clerkId = user?.id || "";
  
  // Fetch user profile to get the user ID
  const { data: userProfile, isLoading: isLoadingUser } = useUsersControllerFindByClerkId(clerkId, {
    enabled: !!clerkId,
  });
  
  const userId = userProfile?.id || "";
  
  // Fetch organization memberships using the user ID
  const { data: organizationMemberships, isLoading: isLoadingMemberships } = useOrganizationMembershipsControllerFindByUserId(userId, {
    enabled: !!userId,
  });
  
  // Fetch organization details for the first membership (if any)
  const firstOrgId = organizationMemberships?.[0]?.organization_id || "";
  const { data: firstOrg, isLoading: isLoadingFirstOrg } = useOrganizationsControllerFindOne(firstOrgId);
  
  // Fetch organization details for the second membership (if any)
  const secondOrgId = organizationMemberships?.[1]?.organization_id || "";
  const { data: secondOrg, isLoading: isLoadingSecondOrg } = useOrganizationsControllerFindOne(secondOrgId);
  
  // Fetch organization details for the third membership (if any)
  const thirdOrgId = organizationMemberships?.[2]?.organization_id || "";
  const { data: thirdOrg, isLoading: isLoadingThirdOrg } = useOrganizationsControllerFindOne(thirdOrgId);
  
  const isLoading = isLoadingUser || isLoadingMemberships || 
    isLoadingFirstOrg || isLoadingSecondOrg || isLoadingThirdOrg;
  
  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full grow shrink-0 basis-0 items-start bg-default-background">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-8 px-12 py-8">
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm">
              <div className="flex w-full flex-col items-start">
                <div className="h-8 w-48 bg-neutral-100 rounded"></div>
                <div className="mt-2 h-5 w-64 bg-neutral-100 rounded"></div>
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4">
                    <div className="h-16 w-16 rounded-full bg-neutral-100"></div>
                    <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                      <div className="h-6 w-32 bg-neutral-100 rounded"></div>
                      <div className="h-4 w-24 bg-neutral-100 rounded"></div>
                    </div>
                    <div className="h-10 w-32 bg-neutral-100 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!organizationMemberships || organizationMemberships.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full grow shrink-0 basis-0 items-start bg-default-background">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-8 px-12 py-8">
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm">
              <div className="flex w-full flex-col items-start">
                <span className="w-full text-heading-3 font-heading-3 text-default-font">
                  Organization Memberships
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  You are not a member of any organizations yet.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create a map of organization IDs to organization data for easy lookup
  const organizationMap = new Map<string, Organization>();
  if (firstOrg && firstOrgId) organizationMap.set(firstOrgId, firstOrg);
  if (secondOrg && secondOrgId) organizationMap.set(secondOrgId, secondOrg);
  if (thirdOrg && thirdOrgId) organizationMap.set(thirdOrgId, thirdOrg);

  return (
    <div className="flex h-full w-full flex-col items-start">
      <div className="flex w-full grow shrink-0 basis-0 items-start bg-default-background">
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-8 px-12 py-8">
          <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm">
            <div className="flex w-full flex-col items-start">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Organization Memberships
              </span>
              <span className="w-full text-body font-body text-subtext-color">
                View and manage your organization memberships and roles
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              {organizationMemberships.map((membership) => {
                const organization = organizationMap.get(membership.organization_id);
                return (
                  <OrganizationItem 
                    key={membership.id}
                    membership={membership}
                    organization={organization}
                    onNavigateToLoginAccess={onNavigateToLoginAccess}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 