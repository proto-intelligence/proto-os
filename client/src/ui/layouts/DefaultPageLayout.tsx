"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/0bee54e10183/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Dropdown Menu — https://app.subframe.com/0bee54e10183/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Sidebar with collapsible sections — https://app.subframe.com/0bee54e10183/library?component=Sidebar+with+collapsible+sections_47616606-525d-4c53-9481-68784d7159c2
 * Avatar — https://app.subframe.com/0bee54e10183/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { DropdownMenu } from "../components/DropdownMenu";
import { SidebarWithCollapsibleSections } from "../components/SidebarWithCollapsibleSections";
import { Avatar } from "../components/Avatar";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "flex h-screen w-full items-center",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <SidebarWithCollapsibleSections
        className="mobile:hidden"
        header={
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <div className="flex w-full items-center gap-4 px-3">
                <img
                  className="h-6 w-6 flex-none object-cover"
                  src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
                />
                <div className="flex grow shrink-0 basis-0 flex-col items-start">
                  <span className="w-full text-body-bold font-body-bold text-default-font">
                    Proto
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    theproto.ai
                  </span>
                </div>
                <SubframeCore.Icon
                  className="text-caption font-caption text-default-font"
                  name="FeatherChevronsUpDown"
                />
              </div>
            </SubframeCore.DropdownMenu.Trigger>
            <SubframeCore.DropdownMenu.Portal>
              <SubframeCore.DropdownMenu.Content
                side="bottom"
                align="start"
                sideOffset={4}
                asChild={true}
              >
                <DropdownMenu>
                  <DropdownMenu.DropdownItem icon={null}>
                    Profile
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon={null}>
                    Settings
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon={null}>
                    Log out
                  </DropdownMenu.DropdownItem>
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
        }
        footer={
          <Avatar image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif">
            A
          </Avatar>
        }
      >
        <div className="flex w-full flex-col items-start">
          <SidebarWithCollapsibleSections.NavItem
            selected={true}
            icon="FeatherHome"
          >
            Home
          </SidebarWithCollapsibleSections.NavItem>
        </div>
        <SidebarWithCollapsibleSections.NavSection label="Knowledge Bases">
          <SidebarWithCollapsibleSections.NavItem icon="FeatherClipboardList">
            Tasks
          </SidebarWithCollapsibleSections.NavItem>
          <SidebarWithCollapsibleSections.NavItem icon="FeatherUsers">
            Patient Panel
          </SidebarWithCollapsibleSections.NavItem>
        </SidebarWithCollapsibleSections.NavSection>
        <SidebarWithCollapsibleSections.NavSection label="Settings">
          <SidebarWithCollapsibleSections.NavItem icon="FeatherDollarSign">
            Billing
          </SidebarWithCollapsibleSections.NavItem>
          <SidebarWithCollapsibleSections.NavItem icon="FeatherKey">
            Secrets
          </SidebarWithCollapsibleSections.NavItem>
        </SidebarWithCollapsibleSections.NavSection>
      </SidebarWithCollapsibleSections>
      {children ? (
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch overflow-y-auto bg-default-background">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
