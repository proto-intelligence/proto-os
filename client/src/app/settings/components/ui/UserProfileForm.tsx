"use client";

import React from "react";
import { Avatar } from "@/ui/components/Avatar";
import { useAuth } from "@clerk/nextjs";
import { useUsersControllerFindByClerkId } from "@/hooks/backend";

export function UserProfileForm() {
  const { userId } = useAuth();
  const clerkId = userId || "";
  
  const { data: userProfile, isLoading, error } = useUsersControllerFindByClerkId(clerkId, {
    enabled: !!clerkId,
  });

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full grow shrink-0 basis-0 items-start bg-default-background">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-8 px-12 py-8">
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm">
              <div className="flex w-full flex-col items-start">
                <div className="h-8 w-48 bg-neutral-100 rounded"></div>
                <div className="mt-2 h-5 w-64 bg-neutral-100 rounded"></div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="h-24 w-24 rounded-full bg-neutral-100"></div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                  <div className="h-10 w-40 bg-neutral-100 rounded"></div>
                  <div className="h-5 w-32 bg-neutral-100 rounded"></div>
                </div>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6">
                <div className="h-12 w-full bg-neutral-100 rounded"></div>
                <div className="h-12 w-full bg-neutral-100 rounded"></div>
                <div className="h-12 w-full bg-neutral-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full grow shrink-0 basis-0 items-start bg-default-background">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-8 px-12 py-8">
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm">
              <div className="flex w-full flex-col items-start">
                <span className="w-full text-heading-3 font-heading-3 text-default-font">
                  Error Loading Profile
                </span>
                <span className="w-full text-body font-body text-subtext-color">
                  There was an error loading your profile information. Please try again later.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Use the data from the userProfile API response
  const firstName = userProfile?.first_name || "";
  const lastName = userProfile?.last_name || "";
  const email = userProfile?.email || "";
  // Since avatar_url is not in the User type, we'll use a default avatar
  const avatarUrl = "";

  return (
    <div className="flex h-full w-full flex-col items-start">
      <div className="flex w-full grow shrink-0 basis-0 items-start bg-default-background">
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-8 px-12 py-8">
          <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm">
            <div className="flex w-full flex-col items-start">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Profile Information
              </span>
              <span className="w-full text-body font-body text-subtext-color">
                Your personal information and profile picture
              </span>
            </div>
            <div className="flex w-full items-start gap-4">
              <Avatar size="x-large" image={avatarUrl}>
                {firstName?.[0] || "U"}
              </Avatar>
            </div>
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6">
              <div className="flex w-full items-start gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="text-body font-body text-subtext-color">First Name</span>
                    <span className="text-body-bold font-body-bold text-default-font">{firstName}</span>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="text-body font-body text-subtext-color">Last Name</span>
                    <span className="text-body-bold font-body-bold text-default-font">{lastName}</span>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="text-body font-body text-subtext-color">Email</span>
                    <span className="text-body-bold font-body-bold text-default-font">{email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 