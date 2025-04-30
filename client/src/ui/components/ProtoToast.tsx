"use client";
/*
 * Documentation:
 * Proto Toast — https://app.subframe.com/8616996521e5/library?component=Proto+Toast_200f14f6-4f55-4f88-8e2d-6dd3eedd09f1
 * Button — https://app.subframe.com/8616996521e5/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";
import { FeatherInfo } from "@subframe/core";

interface ProtoToastRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "neutral" | "error";
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const ProtoToastRoot = React.forwardRef<HTMLElement, ProtoToastRootProps>(
  function ProtoToastRoot(
    {
      variant = "neutral",
      icon = <FeatherInfo />,
      title,
      description,
      actions,
      className,
      ...otherProps
    }: ProtoToastRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "group/200f14f6 flex w-80 items-center gap-4 rounded-md border border-solid border-brand-200 bg-brand-50 px-4 py-3 shadow-lg",
          { "bg-error-600": variant === "error" },
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {icon ? (
          <SubframeCore.IconWrapper
            className={SubframeUtils.twClassNames(
              "text-heading-3 font-heading-3 text-brand-600",
              { "text-background-black": variant === "error" }
            )}
          >
            {icon}
          </SubframeCore.IconWrapper>
        ) : null}
        <div className="flex grow shrink-0 basis-0 flex-col items-start">
          {title ? (
            <span
              className={SubframeUtils.twClassNames(
                "w-full text-body-bold font-body-bold text-brand-600",
                { "text-default-font": variant === "error" }
              )}
            >
              {title}
            </span>
          ) : null}
        </div>
        {actions ? (
          <div className="flex items-center justify-end gap-1">{actions}</div>
        ) : null}
      </div>
    );
  }
);

export const ProtoToast = ProtoToastRoot;
