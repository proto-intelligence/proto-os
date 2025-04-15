"use client";
/*
 * Documentation:
 * Sidebar with collapsible sections — https://app.subframe.com/0bee54e10183/library?component=Sidebar+with+collapsible+sections_47616606-525d-4c53-9481-68784d7159c2
 * Dropdown Menu — https://app.subframe.com/0bee54e10183/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { DropdownMenu } from "./DropdownMenu";
import { Accordion } from "./Accordion";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  children?: React.ReactNode;
  icon?: SubframeCore.IconName;
  rightSlot?: React.ReactNode;
  className?: string;
}

const NavItem = React.forwardRef<HTMLElement, NavItemProps>(function NavItem(
  {
    selected = false,
    children,
    icon = "FeatherCircleDashed",
    rightSlot,
    className,
    ...otherProps
  }: NavItemProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "group/fe62dd83 flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-neutral-50 active:bg-neutral-100",
        {
          "bg-neutral-100 hover:bg-neutral-100 active:bg-neutral-100": selected,
        },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <SubframeCore.Icon
        className={SubframeCore.twClassNames(
          "text-body font-body text-subtext-color",
          { "text-default-font": selected }
        )}
        name={icon}
      />
      {children ? (
        <span
          className={SubframeCore.twClassNames(
            "line-clamp-1 grow shrink-0 basis-0 text-body font-body text-subtext-color",
            { "text-body-bold font-body-bold text-default-font": selected }
          )}
        >
          {children}
        </span>
      ) : null}
      {rightSlot ? <div className="flex items-center">{rightSlot}</div> : null}
    </div>
  );
});

interface NavSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  label?: React.ReactNode;
  icon?: SubframeCore.IconName;
  className?: string;
}

const NavSection = React.forwardRef<HTMLElement, NavSectionProps>(
  function NavSection(
    { children, label, icon = null, className, ...otherProps }: NavSectionProps,
    ref
  ) {
    return (
      <div
        className={SubframeCore.twClassNames(
          "group/36c53d81 flex w-full cursor-pointer flex-col items-start gap-2",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <Accordion
          trigger={
            <div className="flex w-full items-center gap-2 rounded-md px-3 py-2 group-hover/36c53d81:bg-neutral-50">
              <SubframeCore.Icon
                className="text-body font-body text-default-font"
                name={icon}
              />
              {label ? (
                <span className="line-clamp-1 grow shrink-0 basis-0 text-caption-bold font-caption-bold text-subtext-color">
                  {label}
                </span>
              ) : null}
              <Accordion.Chevron />
            </div>
          }
          defaultOpen={true}
        >
          {children ? (
            <div className="flex w-full flex-col items-start">{children}</div>
          ) : null}
        </Accordion>
      </div>
    );
  }
);

interface SidebarWithCollapsibleSectionsRootProps
  extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const SidebarWithCollapsibleSectionsRoot = React.forwardRef<
  HTMLElement,
  SidebarWithCollapsibleSectionsRootProps
>(function SidebarWithCollapsibleSectionsRoot(
  {
    header,
    children,
    footer,
    className,
    ...otherProps
  }: SidebarWithCollapsibleSectionsRootProps,
  ref
) {
  return (
    <nav
      className={SubframeCore.twClassNames(
        "flex h-full w-60 flex-col items-start border-r border-solid border-neutral-border bg-default-background",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {header ? (
        <div className="flex w-full flex-col items-start gap-2 border-b border-solid border-neutral-border px-3 py-4">
          {header}
        </div>
      ) : null}
      {children ? (
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 px-4 py-4 overflow-auto">
          {children}
        </div>
      ) : null}
      {footer ? (
        <div className="flex w-full flex-col items-start justify-end gap-2 px-6 py-6">
          {footer}
        </div>
      ) : null}
    </nav>
  );
});

export const SidebarWithCollapsibleSections = Object.assign(
  SidebarWithCollapsibleSectionsRoot,
  {
    NavItem,
    NavSection,
  }
);
