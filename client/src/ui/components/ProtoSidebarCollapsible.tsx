"use client";
/*
 * Documentation:
 * Proto Sidebar Collapsible — https://app.subframe.com/8616996521e5/library?component=Proto+Sidebar+Collapsible_93288e80-29e5-4457-a57c-46fac4296e0e
 * Icon Button — https://app.subframe.com/8616996521e5/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { FeatherCircleDashed } from "@subframe/core";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  selected?: boolean;
  rightSlot?: React.ReactNode;
  className?: string;
}

const NavItem = React.forwardRef<HTMLElement, NavItemProps>(function NavItem(
  {
    icon = <FeatherCircleDashed />,
    children,
    selected = false,
    rightSlot,
    className,
    ...otherProps
  }: NavItemProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/66be9404 flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 hover:bg-neutral-50 active:bg-neutral-100",
        { "bg-brand-50 hover:bg-brand-50 active:bg-brand-100": selected },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {icon ? (
        <SubframeCore.IconWrapper
          className={SubframeUtils.twClassNames(
            "text-heading-3 font-heading-3 text-neutral-600",
            { "text-brand-700": selected }
          )}
        >
          {icon}
        </SubframeCore.IconWrapper>
      ) : null}
      {children ? (
        <span
          className={SubframeUtils.twClassNames(
            "line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-neutral-600",
            { "text-brand-700": selected }
          )}
        >
          {children}
        </span>
      ) : null}
      {rightSlot ? <div className="flex items-center">{rightSlot}</div> : null}
    </div>
  );
});

interface ProtoSidebarCollapsibleRootProps
  extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  children?: React.ReactNode;
  expanded?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

const ProtoSidebarCollapsibleRoot = React.forwardRef<
  HTMLElement,
  ProtoSidebarCollapsibleRootProps
>(function ProtoSidebarCollapsibleRoot(
  {
    header,
    children,
    expanded = false,
    footer,
    className,
    ...otherProps
  }: ProtoSidebarCollapsibleRootProps,
  ref
) {
  return (
    <nav
      className={SubframeUtils.twClassNames(
        "group/93288e80 flex h-full w-16 flex-col items-start gap-2 cursor-default",
        { "h-full w-60": expanded },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <div
        className={SubframeUtils.twClassNames(
          "flex w-16 grow shrink-0 basis-0 flex-col items-start border-r border-solid border-neutral-border bg-default-background absolute top-0 bottom-0 transition-all",
          { "w-60 grow shrink-0 basis-0": expanded }
        )}
      >
        {header ? (
          <div className="flex w-full flex-col items-center justify-center gap-2 px-5 py-6">
            {header}
          </div>
        ) : null}
        {children ? (
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-1 px-3 py-4 overflow-auto">
            {children}
          </div>
        ) : null}
        {footer ? (
          <div className="flex w-full items-center justify-center gap-4 overflow-hidden border-t border-solid border-neutral-border">
            {footer}
          </div>
        ) : null}
      </div>
    </nav>
  );
});

export const ProtoSidebarCollapsible = Object.assign(
  ProtoSidebarCollapsibleRoot,
  {
    NavItem,
  }
);
