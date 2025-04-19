"use client";

import React from "react";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";
import { Badge } from "@/ui/components/Badge";
import { FeatherSettings, FeatherEye } from "@subframe/core";

// Define types for our data
interface Organization {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  canManage: boolean;
  credentials: {
    id: string;
    service: string;
    username: string;
    password: string;
    accessList: string;
    lastUpdated: string;
    canEdit: boolean;
  }[];
}

interface OrganizationsListProps {
  organizations: Organization[];
  onManageAccess: (orgId: string) => void;
  onViewAccess: (orgId: string) => void;
}

// OrganizationItem component to handle individual organization display
function OrganizationItem({ 
  organization, 
  onManageAccess,
  onViewAccess
}: { 
  organization: Organization;
  onManageAccess: (orgId: string) => void;
  onViewAccess: (orgId: string) => void;
}) {
  const organizationName = organization.name || "Unknown Organization";
  const organizationAvatar = ""; // We don't have logo_url in the current data structure
  
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
          <Badge variant={organization.role === "admin" ? "brand" : "neutral"}>
            {organization.role || "Member"}
          </Badge>
        </div>
        <span className="text-caption font-caption text-subtext-color">
          Joined {new Date(organization.joinDate).toLocaleDateString()}
        </span>
      </div>
      <Button
        className="h-auto w-auto flex-none self-stretch"
        variant="brand-secondary"
        icon={organization.canManage ? <FeatherSettings /> : <FeatherEye />}
        onClick={() => organization.canManage ? onManageAccess(organization.id) : onViewAccess(organization.id)}
      >
        {organization.canManage ? "Manage Access" : "View Access"}
      </Button>
    </div>
  );
}

export function OrganizationsList({ organizations, onManageAccess, onViewAccess }: OrganizationsListProps) {
  if (!organizations || organizations.length === 0) {
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
              {organizations.map((organization) => (
                <OrganizationItem 
                  key={organization.id}
                  organization={organization}
                  onManageAccess={onManageAccess}
                  onViewAccess={onViewAccess}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 