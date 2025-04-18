"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { Tabs } from "@/ui/components/Tabs";
import { FeatherUser } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { FeatherLock } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { FeatherUpload } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";

function ProtoSettingsUser() {
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
            <Tabs.Item active={true} icon={<FeatherUser />}>
              User Profile
            </Tabs.Item>
            <Tabs.Item icon={<FeatherUsers />}>Organizations</Tabs.Item>
            <Tabs.Item icon={<FeatherLock />}>Login &amp; Access</Tabs.Item>
          </Tabs>
          <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm">
            <div className="flex w-full flex-col items-start">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Profile Information
              </span>
              <span className="w-full text-body font-body text-subtext-color">
                Update your personal information and profile picture
              </span>
            </div>
            <div className="flex w-full items-start gap-4">
              <Avatar
                size="x-large"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              >
                J
              </Avatar>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                <Button
                  variant="neutral-secondary"
                  icon={<FeatherUpload />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Upload new picture
                </Button>
                <span className="text-caption font-caption text-subtext-color">
                  JPG or PNG, max 2MB
                </span>
              </div>
            </div>
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6">
              <div className="flex w-full items-start gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                  <TextField
                    className="h-auto w-full flex-none"
                    label="First Name"
                    helpText=""
                  >
                    <TextField.Input
                      placeholder="John"
                      value=""
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {}}
                    />
                  </TextField>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                  <TextField
                    className="h-auto w-full flex-none"
                    label="Last Name"
                    helpText=""
                  >
                    <TextField.Input
                      placeholder="Doe"
                      value=""
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {}}
                    />
                  </TextField>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                  <TextField
                    className="h-auto w-full flex-none"
                    label="Email"
                    helpText=""
                  >
                    <TextField.Input
                      placeholder="john@theproto.ai"
                      value=""
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {}}
                    />
                  </TextField>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtoSettingsUser;