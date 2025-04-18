"use client";

import React, { useState } from "react";
import { Button } from "@/ui/components/Button";
import { Badge } from "@/ui/components/Badge";
import { Table } from "@/ui/components/Table";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { CopyToClipboardField } from "@/ui/components/CopyToClipboardField";
import { Select } from "@/ui/components/Select";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherDatabase, FeatherClipboard, FeatherEdit2, FeatherPlus, FeatherShield } from "@subframe/core";
import { Dialog } from "@/ui/components/Dialog";
import { TextField } from "@/ui/components/TextField";
import { useUser } from "@clerk/nextjs";
import { useUsersControllerGetOrganizationsWithCredentials, useUsersControllerFindByClerkId } from "@/hooks/backend";
import { useLoginCredentialsControllerCreate } from "@/hooks/backend";
import { toast } from "sonner";

interface LoginAccessProps {
  onNavigateBack: () => void;
}

export function LoginAccess({ onNavigateBack }: LoginAccessProps) {
  // Get current user from Clerk
  const { user } = useUser();
  const clerkId = user?.id || "";
  
  // First, get the user from our database using the Clerk ID
  const { data: userData, isLoading: isLoadingUser } = useUsersControllerFindByClerkId(clerkId, {
    enabled: !!clerkId
  });
  
  // Then, fetch organizations with credentials using the user ID from our database
  const { data: organizations, isLoading: isLoadingOrgs, error, refetch } = useUsersControllerGetOrganizationsWithCredentials(userData?.id || "", {
    enabled: !!userData?.id
  });
  
  // Mutation for creating new credentials
  const createCredentialMutation = useLoginCredentialsControllerCreate();
  
  // State for managing the add credential dialog
  const [isAddCredentialDialogOpen, setIsAddCredentialDialogOpen] = useState(false);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string | null>(null);
  const [newCredential, setNewCredential] = useState({
    service_name: "",
    username: "",
    encrypted_password: "",
  });
  
  // Handle opening the add credential dialog for a specific organization
  const handleAddCredential = (organizationId: string) => {
    setSelectedOrganizationId(organizationId);
    setIsAddCredentialDialogOpen(true);
  };
  
  // Handle creating a new credential
  const handleCreateCredential = async () => {
    if (!selectedOrganizationId) return;
    
    try {
      await createCredentialMutation.mutateAsync({
        organization_id: selectedOrganizationId,
        service_name: newCredential.service_name,
        username: newCredential.username,
        encrypted_password: newCredential.encrypted_password,
      });
      
      // Reset form and close dialog
      setNewCredential({
        service_name: "",
        username: "",
        encrypted_password: "",
      });
      setIsAddCredentialDialogOpen(false);
      
      // Refetch data to show the new credential
      refetch();
      
      toast.success("Credential added successfully");
    } catch (error) {
      console.error("Error creating credential:", error);
      toast.error("Failed to add credential");
    }
  };
  
  // Placeholder functions for edit and update access
  const handleEditCredential = (orgId: string, credentialId: string) => {
    console.log("Edit credential", orgId, credentialId);
    // This would be implemented in a future update
  };
  
  const handleUpdateAccess = (orgId: string, credentialId: string, access: string) => {
    console.log("Update access", orgId, credentialId, access);
    // This would be implemented in a future update
  };

  // Loading state
  if (isLoadingUser || isLoadingOrgs) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="text-heading-2 font-heading-2 text-default-font">Loading...</div>
          <div className="text-body font-body text-subtext-color">Please wait while we fetch your login credentials</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="text-heading-2 font-heading-2 text-default-font">Error</div>
          <div className="text-body font-body text-subtext-color">Failed to load login credentials</div>
          <Button 
            className="mt-4"
            onClick={() => refetch()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // User not found state
  if (!userData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="text-heading-2 font-heading-2 text-default-font">User Not Found</div>
          <div className="text-body font-body text-subtext-color">We couldn&apos;t find your user account</div>
          <Button 
            className="mt-4"
            onClick={onNavigateBack}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!organizations || organizations.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="text-heading-2 font-heading-2 text-default-font">No Organizations Found</div>
          <div className="text-body font-body text-subtext-color">You don&apos;t have access to any organizations yet</div>
          <Button 
            className="mt-4"
            onClick={onNavigateBack}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-start">
      <div className="flex w-full grow shrink-0 basis-0 items-start bg-default-background">
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-8 px-12 py-8">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      {org.name}
                    </span>
                    <Badge icon={<FeatherShield />}>{org.role}</Badge>
                  </div>
                  <span className="text-body font-body text-subtext-color">
                    {org.role === "admin"
                      ? "Manage login credentials and access permissions"
                      : "View authorized login credentials"}
                  </span>
                </div>
                {org.role === "admin" && (
                  <Button
                    icon={<FeatherPlus />}
                    onClick={() => handleAddCredential(org.id)}
                  >
                    Add credential
                  </Button>
                )}
              </div>
              
              {org.credentials.length === 0 ? (
                <div className="flex w-full items-center justify-center py-8">
                  <div className="text-center">
                    <div className="text-heading-4 font-heading-4 text-default-font">No Credentials</div>
                    <div className="text-body font-body text-subtext-color">
                      {org.role === "admin" 
                        ? "Add credentials to share with organization members" 
                        : "No credentials have been shared with you yet"}
                    </div>
                  </div>
                </div>
              ) : (
                <Table
                  header={
                    <Table.HeaderRow>
                      <Table.HeaderCell>Service</Table.HeaderCell>
                      <Table.HeaderCell>Username</Table.HeaderCell>
                      <Table.HeaderCell>Password</Table.HeaderCell>
                      <Table.HeaderCell>Access List</Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.HeaderRow>
                  }
                >
                  {org.credentials.map((credential) => (
                    <Table.Row key={credential.id}>
                      <Table.Cell>
                        <div className="flex items-center gap-4">
                          <IconWithBackground
                            size="small"
                            icon={
                              credential.service_name.includes("Health") ? (
                                <FeatherDatabase />
                              ) : (
                                <FeatherClipboard />
                              )
                            }
                            square={true}
                          />
                          <span className="text-body-bold font-body-bold text-default-font">
                            {credential.service_name}
                          </span>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <CopyToClipboardField text={credential.username} />
                      </Table.Cell>
                      <Table.Cell>
                        <CopyToClipboardField text="*******" />
                      </Table.Cell>
                      <Table.Cell>
                        <Select
                          variant="filled"
                          label=""
                          placeholder={
                            org.role === "admin"
                              ? "Select access"
                              : "All Members"
                          }
                          helpText=""
                          value={credential.permissions[0]?.permission || "view"}
                          onValueChange={(value) =>
                            handleUpdateAccess(org.id, credential.id, value)
                          }
                          disabled={org.role !== "admin"}
                        >
                          <Select.Item value="view">View Only</Select.Item>
                          <Select.Item value="manage">Manage</Select.Item>
                        </Select>
                      </Table.Cell>
                      <Table.Cell>
                        {org.role === "admin" ? (
                          <IconButton
                            icon={<FeatherEdit2 />}
                            onClick={() =>
                              handleEditCredential(org.id, credential.id)
                            }
                          />
                        ) : (
                          <span className="text-body font-body text-subtext-color">
                            View Only
                          </span>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table>
              )}
            </div>
          ))}
          
          <Button 
            className="mt-4"
            onClick={onNavigateBack}
          >
            Go Back
          </Button>
        </div>
      </div>
      
      {/* Add Credential Dialog */}
      <Dialog
        open={isAddCredentialDialogOpen}
        onOpenChange={setIsAddCredentialDialogOpen}
        title="Add Login Credential"
      >
        <div className="flex flex-col gap-4 p-4">
          <TextField label="Service Name">
            <TextField.Input
              placeholder="e.g., Electronic Health Records"
              value={newCredential.service_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCredential({...newCredential, service_name: e.target.value})}
            />
          </TextField>
          <TextField label="Username">
            <TextField.Input
              placeholder="Enter username"
              value={newCredential.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCredential({...newCredential, username: e.target.value})}
            />
          </TextField>
          <TextField label="Password">
            <TextField.Input
              type="password"
              placeholder="Enter password"
              value={newCredential.encrypted_password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCredential({...newCredential, encrypted_password: e.target.value})}
            />
          </TextField>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="neutral-secondary"
              onClick={() => setIsAddCredentialDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateCredential}
              disabled={!newCredential.service_name || !newCredential.username || !newCredential.encrypted_password || createCredentialMutation.isPending}
            >
              {createCredentialMutation.isPending ? "Adding..." : "Add Credential"}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
} 