"use client";

import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs";
import { Button } from "@/ui/components/Button";

interface SignUpButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function SignUpButton({ children, className }: SignUpButtonProps) {
  return (
    <ClerkSignUpButton mode="modal">
      <Button
        className={className}
        variant="brand-primary"
        size="medium"
        loading={false}
      >
        {children || "Sign up"}
      </Button>
    </ClerkSignUpButton>
  );
} 