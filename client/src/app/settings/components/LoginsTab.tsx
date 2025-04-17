'use client';

import { Button } from "@/ui/components/Button";
import { Badge } from "@/ui/components/Badge";
import { FeatherPlus, FeatherEye, FeatherEdit } from "@subframe/core";

// API types
interface LoginCredential {
  id: string;
  organization_id: string;
  service_name: string;
  username: string;
  encrypted_password: string;
  created_at: string;
  updated_at: string;
}

interface LoginPermission {
  id: string;
  membership_id: string;
  credential_id: string;
  permission: string;
  granted_by_membership_id?: string;
  created_at: string;
  updated_at: string;
}

enum LoginPermissionType {
  VIEW = 'view',
  MANAGE = 'manage'
}

interface LoginsTabProps {
  credentials: LoginCredential[] | undefined;
  permissions: LoginPermission[] | undefined;
  isLoading: boolean;
}

export function LoginsTab({ credentials, permissions, isLoading }: LoginsTabProps) {
  // Get permission badge color based on permission type
  const getPermissionBadgeColor = (permission: string) => {
    return permission === LoginPermissionType.MANAGE ? "brand" : "neutral";
  };

  // Show loading skeleton if loading
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="h-6 w-48 bg-neutral-100 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-neutral-100 rounded animate-pulse"></div>
          </div>
          
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 border border-neutral-border rounded-lg">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-32 bg-neutral-100 rounded animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="h-8 w-16 bg-neutral-100 rounded animate-pulse"></div>
                      <div className="h-8 w-16 bg-neutral-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="h-4 w-64 bg-neutral-100 rounded animate-pulse"></div>
                  <div className="h-4 w-48 bg-neutral-100 rounded animate-pulse"></div>
                  
                  <div className="mt-2">
                    <div className="h-4 w-32 bg-neutral-100 rounded animate-pulse mb-2"></div>
                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 w-16 bg-neutral-100 rounded animate-pulse"></div>
                      <div className="h-6 w-16 bg-neutral-100 rounded animate-pulse"></div>
                    </div>
                  </div>
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
          <h2 className="text-xl font-semibold text-default-font">Login Credentials</h2>
          <Button variant="brand-primary" size="medium" icon={<FeatherPlus className="h-4 w-4" />}>
            Add Login
          </Button>
        </div>
        
        <div className="flex flex-col gap-4">
          {credentials && credentials.length > 0 ? (
            credentials.map((credential) => {
              // Find permissions for this credential
              const credentialPermissions = permissions?.filter(p => p.credential_id === credential.id) || [];
              
              return (
                <div key={credential.id} className="p-4 border border-neutral-border rounded-lg">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-default-font">{credential.service_name}</h3>
                      <div className="flex gap-2">
                        <Button variant="neutral-secondary" size="small" icon={<FeatherEye className="h-4 w-4" />}>
                          View
                        </Button>
                        <Button variant="neutral-secondary" size="small" icon={<FeatherEdit className="h-4 w-4" />}>
                          Edit
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-subtext-color">Organization: {credential.organization_id}</p>
                    <p className="text-sm text-subtext-color">Username: {credential.username}</p>
                    
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-default-font">Access Permissions:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {credentialPermissions.map(permission => (
                          <Badge key={permission.id} variant={getPermissionBadgeColor(permission.permission)}>
                            {permission.permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-subtext-color">No login credentials found.</p>
          )}
        </div>
      </div>
    </div>
  );
} 