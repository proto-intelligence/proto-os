"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { Tabs } from "@/ui/components/Tabs";
import { FeatherUser } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { FeatherLock } from "@subframe/core";
import { Badge } from "@/ui/components/Badge";
import { FeatherShield } from "@subframe/core";
import { FeatherPlus } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherDatabase } from "@subframe/core";
import { CopyToClipboardField } from "@/ui/components/CopyToClipboardField";
import { Select } from "@/ui/components/Select";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherEdit2 } from "@subframe/core";
import { FeatherClipboard } from "@subframe/core";

function ProtoSettingsLoginsAccess() {
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
            <Tabs.Item icon={<FeatherUsers />}>Organizations</Tabs.Item>
            <Tabs.Item active={true} icon={<FeatherLock />}>
              Login &amp; Access
            </Tabs.Item>
          </Tabs>
          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm">
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Acme Healthcare
                    </span>
                    <Badge icon={<FeatherShield />}>Admin</Badge>
                  </div>
                  <span className="text-body font-body text-subtext-color">
                    Manage login credentials and access permissions
                  </span>
                </div>
                <Button
                  icon={<FeatherPlus />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Add credential
                </Button>
              </div>
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Service</Table.HeaderCell>
                    <Table.HeaderCell>Username</Table.HeaderCell>
                    <Table.HeaderCell>Password</Table.HeaderCell>
                    <Table.HeaderCell>Access List</Table.HeaderCell>
                    <Table.HeaderCell>Last Updated</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.HeaderRow>
                }
              >
                <Table.Row>
                  <Table.Cell>
                    <div className="flex items-center gap-4">
                      <IconWithBackground
                        size="small"
                        icon={<FeatherDatabase />}
                        square={true}
                      />
                      <span className="text-body-bold font-body-bold text-default-font">
                        Electronic Health Records
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <CopyToClipboardField text="johndoe@acme.com" />
                  </Table.Cell>
                  <Table.Cell>
                    <CopyToClipboardField text="*******" />
                  </Table.Cell>
                  <Table.Cell>
                    <Select
                      variant="filled"
                      label=""
                      placeholder="Select access"
                      helpText=""
                      value={undefined}
                      onValueChange={(value: string) => {}}
                    >
                      <Select.Item value="all">all</Select.Item>
                      <Select.Item value="admin">admin</Select.Item>
                      <Select.Item value="specific">specific</Select.Item>
                    </Select>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-subtext-color">
                      Apr 18, 2025
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <IconButton
                      icon={<FeatherEdit2 />}
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table>
            </div>
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 pt-4 pb-6 shadow-sm">
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Proto Health Systems
                    </span>
                    <Badge variant="neutral">Member</Badge>
                  </div>
                  <span className="text-body font-body text-subtext-color">
                    View authorized login credentials
                  </span>
                </div>
              </div>
              <Table
                header={
                  <Table.HeaderRow>
                    <Table.HeaderCell>Service</Table.HeaderCell>
                    <Table.HeaderCell>Username</Table.HeaderCell>
                    <Table.HeaderCell>Password</Table.HeaderCell>
                    <Table.HeaderCell>Access List</Table.HeaderCell>
                    <Table.HeaderCell>Last Updated</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                  </Table.HeaderRow>
                }
              >
                <Table.Row>
                  <Table.Cell>
                    <div className="flex items-center gap-4">
                      <IconWithBackground
                        variant="neutral"
                        size="small"
                        icon={<FeatherClipboard />}
                        square={true}
                      />
                      <span className="text-body-bold font-body-bold text-default-font">
                        Patient Portal
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <CopyToClipboardField text="operator@proto.com" />
                  </Table.Cell>
                  <Table.Cell>
                    <CopyToClipboardField text="*******" />
                  </Table.Cell>
                  <Table.Cell>
                    <Select
                      disabled={true}
                      variant="filled"
                      label=""
                      placeholder="All Members"
                      helpText=""
                      value={undefined}
                      onValueChange={(value: string) => {}}
                    >
                      <Select.Item value="all">all</Select.Item>
                    </Select>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-subtext-color">
                      Apr 15, 2025
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-body font-body text-subtext-color">
                      View Only
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtoSettingsLoginsAccess;