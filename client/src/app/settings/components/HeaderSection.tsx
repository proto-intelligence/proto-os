'use client';

import { Button } from "@/ui/components/Button";
import { FeatherSave } from "@subframe/core";

interface HeaderSectionProps {
  activeTab: string;
  onSave: () => void;
}

export function HeaderSection({ activeTab, onSave }: HeaderSectionProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-default-font">Settings</h1>
      {activeTab === "profile" && (
        <Button 
          variant="brand-primary" 
          size="medium" 
          icon={<FeatherSave className="h-4 w-4" />}
          onClick={onSave}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
} 