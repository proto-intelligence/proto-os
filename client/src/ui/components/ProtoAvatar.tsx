"use client";
/*
 * Documentation:
 * Proto Avatar — https://app.subframe.com/8616996521e5/library?component=Proto+Avatar_9774174f-f47f-48fe-9c03-bf67a4069b62
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface ProtoAvatarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "neutral" | "error" | "success" | "warning";
  size?: "x-large" | "large" | "medium" | "small" | "x-small";
  children?: React.ReactNode;
  image?: string;
  square?: boolean;
  className?: string;
}

const ProtoAvatarRoot = React.forwardRef<HTMLElement, ProtoAvatarRootProps>(
  function ProtoAvatarRoot(
    {
      variant = "brand",
      size = "medium",
      children,
      image,
      square = false,
      className,
      ...otherProps
    }: ProtoAvatarRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/9774174f flex h-8 w-8 flex-col items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-100 relative",
          {
            "rounded-md": square,
            "h-5 w-5": size === "x-small",
            "h-6 w-6": size === "small",
            "h-12 w-12": size === "large",
            "h-16 w-16": size === "x-large",
            "bg-warning-100": variant === "warning",
            "bg-success-100": variant === "success",
            "bg-error-100": variant === "error",
            "bg-neutral-100": variant === "neutral",
          },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "line-clamp-1 w-full font-['Inter'] text-[14px] font-[500] leading-[14px] text-brand-800 text-center absolute",
              {
                "font-['Inter'] text-[10px] font-[500] leading-[10px] tracking-normal":
                  size === "x-small" || size === "small",
                "font-['Inter'] text-[18px] font-[500] leading-[18px] tracking-normal":
                  size === "large",
                "font-['Inter'] text-[24px] font-[500] leading-[24px] tracking-normal":
                  size === "x-large",
                "text-warning-800": variant === "warning",
                "text-success-800": variant === "success",
                "text-error-800": variant === "error",
                "text-neutral-800": variant === "neutral",
              }
            )}
          >
            {children}
          </span>
        ) : null}
        {image ? (
          <img
            className={SubframeUtils.twClassNames(
              "h-8 w-8 flex-none object-cover absolute",
              {
                "h-5 w-5 flex-none": size === "x-small",
                "h-6 w-6 flex-none": size === "small",
                "h-12 w-12 flex-none": size === "large",
                "h-16 w-16 flex-none": size === "x-large",
              }
            )}
            src={image}
          />
        ) : null}
      </div>
    );
  }
);

export const ProtoAvatar = ProtoAvatarRoot;
