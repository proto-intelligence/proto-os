"use client";
/*
 * Documentation:
 * Proto Sidebar Collapsible — https://app.subframe.com/8616996521e5/library?component=Proto+Sidebar+Collapsible_93288e80-29e5-4457-a57c-46fac4296e0e
 * Icon Button — https://app.subframe.com/8616996521e5/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { IconButton } from "./IconButton";
import { FeatherMenu } from "@subframe/core";
import { FeatherX } from "@subframe/core";
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
  expanded?: boolean;
  className?: string;
}

const ProtoSidebarCollapsibleRoot = React.forwardRef<
  HTMLElement,
  ProtoSidebarCollapsibleRootProps
>(function ProtoSidebarCollapsibleRoot(
  {
    expanded = false,
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
        <div className="flex w-full flex-col items-center justify-center gap-2 px-5 py-6">
          <div
            className={SubframeUtils.twClassNames(
              "flex items-center justify-center gap-2",
              { "h-auto w-full flex-none items-center justify-end": expanded }
            )}
          >
            <IconButton
              className={SubframeUtils.twClassNames("h-auto w-auto flex-none", {
                "hidden h-auto w-auto flex-none": expanded,
              })}
              disabled={false}
              variant="neutral-tertiary"
              size="large"
              icon={<FeatherMenu />}
            />
            <IconButton
              className={SubframeUtils.twClassNames(
                "hidden h-auto w-auto flex-none",
                { flex: expanded }
              )}
              disabled={false}
              variant="neutral-tertiary"
              size="large"
              icon={<FeatherX />}
            />
          </div>
        </div>
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-1 px-3 py-4 overflow-auto">
          <NavItem>Item</NavItem>
        </div>
        <div className="flex w-full items-center justify-center gap-4 overflow-hidden border-t border-solid border-neutral-border">
          <div
            className={SubframeUtils.twClassNames(
              "flex h-12 grow shrink-0 basis-0 items-center gap-6 px-2 py-2",
              {
                "h-12 grow shrink-0 basis-0 flex-row flex-nowrap gap-6 px-0 py-0":
                  expanded,
              }
            )}
          >
            <div
              className={SubframeUtils.twClassNames("flex items-center gap-6", {
                "h-auto grow shrink-0 basis-0 items-center justify-start self-stretch px-2 py-2":
                  expanded,
              })}
            >
              <img
                className={SubframeUtils.twClassNames("flex-none", {
                  "hidden h-12 w-8 flex-none object-cover": expanded,
                })}
                src="https://res.cloudinary.com/subframe/image/upload/v1744735723/uploads/7701/oog2ssqmh5bmqiy3x6i1.png"
              />
              <img
                className={SubframeUtils.twClassNames("flex-none", {
                  "h-auto grow shrink-0 basis-0 self-stretch object-contain":
                    expanded,
                })}
                src="https://res.cloudinary.com/subframe/image/upload/v1744735711/uploads/7701/lwsmwbsij3saygbzmlwh.png"
              />
            </div>
          </div>
        </div>
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
