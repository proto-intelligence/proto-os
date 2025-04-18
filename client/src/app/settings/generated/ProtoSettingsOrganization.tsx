"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { Tabs } from "@/ui/components/Tabs";
import { FeatherUser } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { FeatherLock } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";
import { FeatherSettings } from "@subframe/core";
import { FeatherEye } from "@subframe/core";

function ProtoSettingsOrganizations() {
  return (
    <div className="flex h-full w-full flex-col items-start">
      <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-12 py-4">
        <span className="grow shrink-0 basis-0 text-heading-2 font-heading-2 text-default-font">
          Settings
        </span>
        <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
          Save changes
        </Button>
      </div>
      <div className="flex w-full grow shrink-0 basis-0 items-start bg-default-background">
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-8 px-12 py-8">
          <Tabs>
            <Tabs.Item icon={<FeatherUser />}>User Profile</Tabs.Item>
            <Tabs.Item active={true} icon={<FeatherUsers />}>
              Organizations
            </Tabs.Item>
            <Tabs.Item icon={<FeatherLock />}>Login &amp; Access</Tabs.Item>
          </Tabs>
          <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm">
            <div className="flex w-full flex-col items-start">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Organization Memberships
              </span>
              <span className="w-full text-body font-body text-subtext-color">
                View and manage your organization memberships and roles
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4">
                <Avatar size="large" image="" square={true}>
                  A
                </Avatar>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                  <div className="flex w-full items-center gap-2">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Acme Healthcare
                    </span>
                    <Badge>Admin</Badge>
                  </div>
                  <span className="text-caption font-caption text-subtext-color">
                    Joined Apr 18, 2025
                  </span>
                </div>
                <Button
                  className="h-auto w-auto flex-none self-stretch"
                  variant="brand-secondary"
                  icon={<FeatherSettings />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Manage Access
                </Button>
              </div>
              <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4">
                <Avatar size="large" image="" square={true}>
                  P
                </Avatar>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                  <div className="flex w-full items-center gap-2">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Proto Health Systems
                    </span>
                    <Badge variant="neutral">Proto Operator</Badge>
                  </div>
                  <span className="text-caption font-caption text-subtext-color">
                    Joined Apr 15, 2025
                  </span>
                </div>
                <Button
                  className="h-auto w-auto flex-none self-stretch"
                  variant="brand-secondary"
                  icon={<FeatherEye />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  View Access
                </Button>
              </div>
              <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4">
                <Avatar size="large" image="" square={true}>
                  M
                </Avatar>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                  <div className="flex w-full items-center gap-2">
                    <span className="text-body-bold font-body-bold text-default-font">
                      MedTech Solutions
                    </span>
                    <Badge variant="neutral">Member</Badge>
                  </div>
                  <span className="text-caption font-caption text-subtext-color">
                    Joined Apr 10, 2025
                  </span>
                </div>
                <Button
                  className="h-auto w-auto flex-none self-stretch"
                  variant="brand-secondary"
                  icon={<FeatherEye />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  View Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtoSettingsOrganizations;