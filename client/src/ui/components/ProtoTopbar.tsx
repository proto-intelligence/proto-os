"use client";
/*
 * Documentation:
 * Proto Topbar — https://app.subframe.com/8616996521e5/library?component=Proto+Topbar_9bd2d000-9e95-49f0-96a8-65f3f040a3f9
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const NavItem = React.forwardRef<HTMLElement, NavItemProps>(function NavItem(
  {
    selected = false,
    icon = null,
    children,
    className,
    ...otherProps
  }: NavItemProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/4b4ab56c flex h-full cursor-pointer items-center gap-2 border-b-0 border-solid border-neutral-border px-2 py-2 hover:bg-transparent",
        { "border-b border-solid border-brand-primary": selected },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {icon ? (
        <SubframeCore.IconWrapper
          className={SubframeUtils.twClassNames(
            "text-body font-body text-default-font group-hover/4b4ab56c:text-brand-700",
            { "text-brand-700": selected }
          )}
        >
          {icon}
        </SubframeCore.IconWrapper>
      ) : null}
      {children ? (
        <span
          className={SubframeUtils.twClassNames(
            "text-body-bold font-body-bold text-default-font group-hover/4b4ab56c:text-brand-700",
            { "text-brand-700": selected }
          )}
        >
          {children}
        </span>
      ) : null}
    </div>
  );
});

interface ProtoTopbarRootProps extends React.HTMLAttributes<HTMLElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

const ProtoTopbarRoot = React.forwardRef<HTMLElement, ProtoTopbarRootProps>(
  function ProtoTopbarRoot(
    { left, center, right, className, ...otherProps }: ProtoTopbarRootProps,
    ref
  ) {
    return (
      <nav
        className={SubframeUtils.twClassNames(
          "flex h-11 w-full items-center justify-between border-b border-solid border-neutral-border bg-default-background px-1 py-1",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex grow shrink-0 basis-0 items-center justify-between self-stretch px-4 py-4">
          {left ? (
            <div className="flex grow shrink-0 basis-0 items-center justify-between self-stretch">
              {left}
            </div>
          ) : null}
          {center ? (
            <div className="flex grow shrink-0 basis-0 items-center justify-between self-stretch">
              {center}
            </div>
          ) : null}
          {right ? (
            <div className="flex grow shrink-0 basis-0 items-center justify-between self-stretch">
              {right}
            </div>
          ) : null}
        </div>
      </nav>
    );
  }
);

export const ProtoTopbar = Object.assign(ProtoTopbarRoot, {
  NavItem,
});
