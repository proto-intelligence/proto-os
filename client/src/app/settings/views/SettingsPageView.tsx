"use client";

import React, { useState } from "react";
import { Tabs } from "@/ui/components/Tabs";
import { FeatherUser, FeatherUsers, FeatherLock } from "@subframe/core";
import { UserProfileForm } from "../components/ui/UserProfileForm";
import { OrganizationsList } from "../components/ui/OrganizationsList";
import { LoginAccess } from "../components/ui/LoginAccess";
import { AppLayout } from "@/components/AppLayout";

export function SettingsPageView() {
  const [activeTab, setActiveTab] = useState<"profile" | "organizations" | "login">("profile");

  // Mock data for organizations
  const organizations = [
    {
      id: "1",
      name: "Acme Healthcare",
      role: "Admin",
      joinDate: "Apr 18, 2025",
      canManage: true,
      credentials: [
        {
          id: "1",
          service: "Electronic Health Records",
          username: "johndoe@acme.com",
          password: "********",
          accessList: "all",
          lastUpdated: "Apr 18, 2025",
          canEdit: true,
        },
      ],
    },
    {
      id: "2",
      name: "Proto Health Systems",
      role: "Proto Operator",
      joinDate: "Apr 15, 2025",
      canManage: false,
      credentials: [
        {
          id: "2",
          service: "Patient Portal",
          username: "operator@proto.com",
          password: "********",
          accessList: "all",
          lastUpdated: "Apr 15, 2025",
          canEdit: false,
        },
      ],
    },
  ];

  const handleManageAccess = (orgId: string) => {
    // TODO: Implement manage access logic
    console.log("Managing access for org:", orgId);
  };

  const handleViewAccess = (orgId: string) => {
    // TODO: Implement view access logic
    console.log("Viewing access for org:", orgId);
  };

  const handleAddCredential = (orgId: string) => {
    // TODO: Implement add credential logic
    console.log("Adding credential for org:", orgId);
  };

  const handleEditCredential = (orgId: string, credentialId: string) => {
    // TODO: Implement edit credential logic
    console.log("Editing credential:", credentialId, "for org:", orgId);
  };

  const handleUpdateAccess = (orgId: string, credentialId: string, access: string) => {
    // TODO: Implement update access logic
    console.log("Updating access for credential:", credentialId, "in org:", orgId, "to:", access);
  };

  return (
    <AppLayout>
    <div className="flex h-full w-full flex-col items-start">
      <div className="flex flex-col w-full grow shrink-0 basis-0 items-start bg-default-background">
        <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-12 py-4">
            <span className="grow shrink-0 basis-0 text-heading-2 font-heading-2 text-default-font">
            Settings
            </span>
        </div>
        <div className="flex  w-full  grow shrink-0 basis-0 flex-col items-start gap-8 px-12 py-8">
          <Tabs>
            <Tabs.Item
              active={activeTab === "profile"}
              icon={<FeatherUser />}
              onClick={() => setActiveTab("profile")}
            >
              User Profile
            </Tabs.Item>
            <Tabs.Item
              active={activeTab === "organizations"}
              icon={<FeatherUsers />}
              onClick={() => setActiveTab("organizations")}
            >
              Organizations
            </Tabs.Item>
            <Tabs.Item
              active={activeTab === "login"}
              icon={<FeatherLock />}
              onClick={() => setActiveTab("login")}
            >
              Login & Access
            </Tabs.Item>
          </Tabs>

          {activeTab === "profile" && <UserProfileForm />}

          {activeTab === "organizations" && (
            <OrganizationsList
              organizations={organizations}
              onManageAccess={handleManageAccess}
              onViewAccess={handleViewAccess}
            />
          )}

          {activeTab === "login" && (
            <LoginAccess
              organizations={organizations}
              onAddCredential={handleAddCredential}
              onEditCredential={handleEditCredential}
              onUpdateAccess={handleUpdateAccess}
            />
          )}
        </div>
      </div>
    </div>
    </AppLayout>
  );
} 