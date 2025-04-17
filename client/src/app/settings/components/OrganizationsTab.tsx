'use client';

import { Button } from "@/ui/components/Button";
import { Badge } from "@/ui/components/Badge";
import { FeatherPlus } from "@subframe/core";
import { useEffect, useState } from "react";

// API types
interface OrganizationMembership {
  id: string;
  user_id: string;
  organization_id: string;
  role: string;
  created_at: string;
  updated_at: string;
}

enum OrganizationRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  PATIENT = 'patient',
  VENDOR = 'vendor',
  PROTO_ADMIN = 'proto-admin',
  PROTO_OPERATOR = 'proto-operator'
}

interface OrganizationsTabProps {
  memberships: OrganizationMembership[] | undefined;
  isLoading: boolean;
}

export function OrganizationsTab({ memberships, isLoading }: OrganizationsTabProps) {
  // State to track if we're on the client side
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get role badge color based on role
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case OrganizationRole.ADMIN:
        return "brand";
      case OrganizationRole.PROTO_ADMIN:
        return "success";
      case OrganizationRole.PROTO_OPERATOR:
        return "warning";
      default:
        return "neutral";
    }
  };

  // Format date only on the client side
  const formatDate = (dateString: string) => {
    if (!isClient) return dateString; // Return raw string during SSR
    return new Date(dateString).toLocaleDateString();
  };

  // Show loading skeleton if loading
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="h-6 w-48 bg-neutral-100 rounded animate-pulse"></div>
            <div className="h-10 w-40 bg-neutral-100 rounded animate-pulse"></div>
          </div>
          
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-neutral-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-32 bg-neutral-100 rounded animate-pulse"></div>
                    <div className="h-4 w-48 bg-neutral-100 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-20 bg-neutral-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-default-font">Your Organizations</h2>
          <Button variant="brand-primary" size="medium" icon={<FeatherPlus className="h-4 w-4" />}>
            Join Organization
          </Button>
        </div>
        
        <div className="flex flex-col gap-4">
          {memberships && memberships.length > 0 ? (
            memberships.map((membership) => (
              <div key={membership.id} className="p-4 border border-neutral-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-default-font">
                      {membership.organization_id} {/* We'll need to fetch organization details separately */}
                    </h3>
                    <p className="text-sm text-subtext-color">Member since {formatDate(membership.created_at)}</p>
                  </div>
                  <Badge variant={getRoleBadgeColor(membership.role)}>
                    {membership.role}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-subtext-color">You are not a member of any organizations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
} 