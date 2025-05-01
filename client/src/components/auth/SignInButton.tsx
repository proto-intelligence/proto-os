"use client";

import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import { Button } from "@/ui/components/Button";

interface SignInButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function SignInButton({ children, className }: SignInButtonProps) {
  return (
    <ClerkSignInButton mode="modal">
      <Button
        className={className}
        variant="neutral-secondary"
        size="medium"
        loading={false}
      >
        {children || "Sign in"}
      </Button>
    </ClerkSignInButton>
  );
} 