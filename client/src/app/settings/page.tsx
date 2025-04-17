"use client";

import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { HeaderSection } from "./components/HeaderSection";
import { TabsNavigation } from "./components/TabsNavigation";
import { ProfileTab } from "./components/ProfileTab";
import { OrganizationsTab } from "./components/OrganizationsTab";
import { LoginsTab } from "./components/LoginsTab";
import { LoadingState } from "./components/LoadingState";
import { useSettingsData } from "./hooks/useSettingsData";
import { Alert } from "@/ui/components/Alert";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isMounted, setIsMounted] = useState(false);
  
  const {
    clerkUser,
    formData,
    memberships,
    credentials,
    permissions,
    isLoading,
    errors,
    handleInputChange,
    handleSave
  } = useSettingsData();

  // Set isMounted to true once component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if there are any errors
  const hasErrors = Object.keys(errors).length > 0;

  // If not mounted yet, show nothing to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <AppLayout>
      <div className="flex flex-col w-full max-w-4xl mx-auto p-6 gap-6">
        <HeaderSection 
          activeTab={activeTab} 
          onSave={handleSave} 
        />

        {hasErrors && (
          <Alert 
            variant="error"
            title="Error loading data"
            description={
              <div>
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            }
          />
        )}

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