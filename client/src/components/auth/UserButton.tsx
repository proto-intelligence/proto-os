"use client";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";

interface UserButtonProps {
  afterSignOutUrl?: string;
  appearance?: {
    elements?: Record<string, string | number | boolean>;
  };
}

export function UserButton({ 
  afterSignOutUrl = "/",
  appearance = {
    elements: {
      avatarBox: "w-8 h-8",
      userButtonPopoverCard: "shadow-md rounded-lg",
    }
  }
}: UserButtonProps) {
  return (
    <ClerkUserButton 
      afterSignOutUrl={afterSignOutUrl}
      appearance={appearance}
    />
  );
} 