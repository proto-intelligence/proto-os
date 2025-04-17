'use client';

import { Tabs } from "@/ui/components/Tabs";
import { FeatherUser, FeatherUsers, FeatherKey } from "@subframe/core";

interface TabsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabsNavigation({ activeTab, onTabChange }: TabsNavigationProps) {
  return (
    <div className="flex border-b border-neutral-border">
      <Tabs.Item 
        active={activeTab === "profile"} 
        icon={<FeatherUser className="h-4 w-4" />}
        onClick={() => onTabChange("profile")}
      >
        Profile
      </Tabs.Item>
      <Tabs.Item 
        active={activeTab === "organizations"} 
        icon={<FeatherUsers className="h-4 w-4" />}
        onClick={() => onTabChange("organizations")}
      >
        Organizations
      </Tabs.Item>
      <Tabs.Item 
        active={activeTab === "logins"} 
        icon={<FeatherKey className="h-4 w-4" />}
        onClick={() => onTabChange("logins")}
      >
        Logins
      </Tabs.Item>
    </div>
  );
} 