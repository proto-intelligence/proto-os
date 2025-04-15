"use client";
/*
 * Documentation:
 * Tag Badge — https://app.subframe.com/0bee54e10183/library?component=Tag+Badge_13d10a79-1033-4a65-880e-a875188b7d12
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface TagBadgeRootProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: SubframeCore.IconName;
  children?: React.ReactNode;
  iconRight?: SubframeCore.IconName;
  active?: boolean;
  className?: string;
}

const TagBadgeRoot = React.forwardRef<HTMLElement, TagBadgeRootProps>(
  function TagBadgeRoot(
    {
      icon = null,
      children,
      iconRight = null,
      active = false,
      className,
      ...otherProps
    }: TagBadgeRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/13d10a79 flex h-6 items-center gap-1 rounded-md border border-solid border-neutral-border bg-neutral-50 px-2",
          { "bg-success-200": active },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <SubframeCore.Icon
          className="text-caption font-caption text-brand-700"
          name={icon}
        />
        {children ? (
          <span className="whitespace-nowrap text-caption font-caption text-default-font">
            {children}
          </span>
        ) : null}
        <SubframeCore.Icon
          className="text-caption font-caption text-brand-700"
          name={iconRight}
        />
      </div>
    );
  }
);

export const TagBadge = TagBadgeRoot;
