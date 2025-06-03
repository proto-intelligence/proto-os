"use client";
/*
 * Documentation:
 * Proto Badge — https://app.subframe.com/61fe868f53c4/library?component=Proto+Badge_b4dec464-df9b-46f0-ae5e-067c8c05069a
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface ProtoBadgeRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "neutral" | "error" | "warning" | "success";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

const ProtoBadgeRoot = React.forwardRef<HTMLElement, ProtoBadgeRootProps>(
  function ProtoBadgeRoot(
    {
      variant = "brand",
      icon = null,
      children,
      iconRight = null,
      className,
      ...otherProps
    }: ProtoBadgeRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/b4dec464 flex h-6 items-center gap-1 rounded-md border border-solid border-brand-100 bg-brand-100 px-2",
          {
            "border border-solid border-success-100 bg-success-100":
              variant === "success",
            "border border-solid border-warning-100 bg-warning-100":
              variant === "warning",
            "border border-solid border-error-100 bg-error-100":
              variant === "error",
            "border border-solid border-neutral-100 bg-neutral-100":
              variant === "neutral",
          },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {icon ? (
          <SubframeCore.IconWrapper
            className={SubframeUtils.twClassNames(
              "text-caption font-caption text-brand-700",
              {
                "text-success-800": variant === "success",
                "text-warning-800": variant === "warning",
                "text-error-700": variant === "error",
                "text-neutral-700": variant === "neutral",
              }
            )}
          >
            {icon}
          </SubframeCore.IconWrapper>
        ) : null}
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "whitespace-nowrap text-caption font-caption text-brand-800",
              {
                "text-success-800": variant === "success",
                "text-warning-800": variant === "warning",
                "text-error-800": variant === "error",
                "text-neutral-700": variant === "neutral",
              }
            )}
          >
            {children}
          </span>
        ) : null}
        {iconRight ? (
          <SubframeCore.IconWrapper
            className={SubframeUtils.twClassNames(
              "text-caption font-caption text-brand-700",
              {
                "text-success-800": variant === "success",
                "text-warning-800": variant === "warning",
                "text-error-700": variant === "error",
                "text-neutral-700": variant === "neutral",
              }
            )}
          >
            {iconRight}
          </SubframeCore.IconWrapper>
        ) : null}
      </div>
    );
  }
);

export const ProtoBadge = ProtoBadgeRoot;
