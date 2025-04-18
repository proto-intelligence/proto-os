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

interface LoginAccessProps {
  onNavigateBack: () => void;
}

export function LoginAccess({ onNavigateBack }: LoginAccessProps) {
  // State for managing the add credential dialog
  const [isAddCredentialDialogOpen, setIsAddCredentialDialogOpen] = useState(false);
  const [newCredential, setNewCredential] = useState({
    service_name: "",
    username: "",
    encrypted_password: "",
  });
  
  // Mock data for demonstration
  const organizations = [
    {
      id: "org-1",
      name: "Healthcare Organization",
      role: "admin",
      credentials: [
        {
          id: "cred-1",
          service: "Electronic Health Records",
          username: "admin@healthcare.org",
          password: "********",
          accessList: "admin",
          lastUpdated: "2023-05-15",
          canEdit: true
        },
        {
          id: "cred-2",
          service: "Patient Portal",
          username: "portal@healthcare.org",
          password: "********",
          accessList: "all",
          lastUpdated: "2023-06-20",
          canEdit: true
        }
      ]
    },
    {
      id: "org-2",
      name: "Research Institute",
      role: "member",
      credentials: [
        {
          id: "cred-3",
          service: "Research Database",
          username: "researcher@institute.org",
          password: "********",
          accessList: "all",
          lastUpdated: "2023-07-10",
          canEdit: false
        }
      ]
    }
  ];
  
  // Placeholder functions
  const handleAddCredential = () => {
    setIsAddCredentialDialogOpen(true);
  };
  
  const handleCreateCredential = () => {
    setIsAddCredentialDialogOpen(false);
  };
  
  const handleEditCredential = (orgId: string, credentialId: string) => {
    console.log("Edit credential", orgId, credentialId);
  };
  
  const handleUpdateAccess = (orgId: string, credentialId: string, access: string) => {
    console.log("Update access", orgId, credentialId, access);
  };

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
                    onClick={() => handleAddCredential()}
                  >
                    Add credential
                  </Button>
                )}
              </div>
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Service</Table.HeaderCell>
                    <Table.HeaderCell>Username</Table.HeaderCell>
                    <Table.HeaderCell>Password</Table.HeaderCell>
                    <Table.HeaderCell>Access List</Table.HeaderCell>
                    <Table.HeaderCell>Last Updated</Table.HeaderCell>
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
                            credential.service.includes("Health") ? (
                              <FeatherDatabase />
                            ) : (
                              <FeatherClipboard />
                            )
                          }
                          square={true}
                        />
                        <span className="text-body-bold font-body-bold text-default-font">
                          {credential.service}
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
                        value={credential.accessList}
                        onValueChange={(value) =>
                          handleUpdateAccess(org.id, credential.id, value)
                        }
                        disabled={org.role !== "admin"}
                      >
                        <Select.Item value="all">All Members</Select.Item>
                        <Select.Item value="admin">Admin Only</Select.Item>
                        <Select.Item value="specific">Specific Users</Select.Item>
                      </Select>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-body font-body text-subtext-color">
                        {credential.lastUpdated}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      {credential.canEdit ? (
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
              disabled={!newCredential.service_name || !newCredential.username || !newCredential.encrypted_password}
            >
              Add Credential
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
} 