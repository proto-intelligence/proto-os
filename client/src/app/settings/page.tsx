"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { HeaderSection } from "./components/HeaderSection";
import { TabsNavigation } from "./components/TabsNavigation";
import { ProfileTab } from "./components/ProfileTab";
import { OrganizationsTab } from "./components/OrganizationsTab";
import { LoginsTab } from "./components/LoginsTab";
import { LoadingState } from "./components/LoadingState";
import { useSettingsData } from "./hooks/useSettingsData";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  
  const {
    clerkUser,
    formData,
    memberships,
    credentials,
    permissions,
    isLoading,
    handleInputChange,
    handleSave
  } = useSettingsData();

  return (
    <AppLayout>
      <div className="flex flex-col w-full max-w-4xl mx-auto p-6 gap-6">
        <HeaderSection 
          activeTab={activeTab} 
          onSave={handleSave} 
        />

        <div className="flex flex-col w-full">
          <TabsNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              {activeTab === "profile" && (
                <ProfileTab 
                  user={clerkUser}
                  formData={formData}
                  onInputChange={handleInputChange}
                />
              )}

              {activeTab === "organizations" && (
                <OrganizationsTab 
                  memberships={memberships}
                  isLoading={isLoading}
                />
              )}

              {activeTab === "logins" && (
                <LoginsTab 
                  credentials={credentials}
                  permissions={permissions}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
} 