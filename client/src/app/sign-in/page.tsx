"use client";

import React, { useEffect } from "react";
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/components/Button";

function MinimalSignInPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  // If user is signed in, don't render the sign-in page
  if (isSignedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-default-background">
      <div className="flex w-full max-w-[320px] flex-col items-center justify-center gap-8 px-12 py-12">
        <div className="flex flex-col items-center justify-center gap-6">
          <img
            className="h-10 flex-none object-cover"
            src="https://res.cloudinary.com/subframe/image/upload/v1744737307/uploads/7701/ypstm3hrrfkqnijjgmld.png"
          />
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Welcome
            </span>
            <span className="text-body font-body text-subtext-color">
              Choose an option to continue
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4 px-1 py-1">
          <SignInButton mode="modal">
            <Button variant="brand-primary" size="medium" className="w-full">
              Sign In
            </Button>
          </SignInButton>
          <div className="flex w-full items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-body font-body text-subtext-color">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <SignUpButton mode="modal">
            <Button variant="neutral-secondary" size="medium" className="w-full">
              Create Account
            </Button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}

export default MinimalSignInPage;