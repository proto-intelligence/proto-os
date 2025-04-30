"use client";
/*
 * Documentation:
 * Proto Manual Task — https://app.subframe.com/8616996521e5/library?component=Proto+Manual+Task_20cb2dcb-f68d-4e6c-98b6-564c326a9579
 * Proto Avatar — https://app.subframe.com/8616996521e5/library?component=Proto+Avatar_9774174f-f47f-48fe-9c03-bf67a4069b62
 * Badge — https://app.subframe.com/8616996521e5/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { FeatherCheck } from "@subframe/core";

interface ProtoManualTaskRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  footerSlot?: React.ReactNode;
  mainSlot?: React.ReactNode;
  headerSlot?: React.ReactNode;
  variant?: "default";
  _default?: "default" | "hover";
  className?: string;
}

const ProtoManualTaskRoot = React.forwardRef<
  HTMLElement,
  ProtoManualTaskRootProps
>(function ProtoManualTaskRoot(
  {
    footerSlot,
    mainSlot,
    headerSlot,
    variant = "default",
    _default = "default",
    className,
    ...otherProps
  }: ProtoManualTaskRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/20cb2dcb flex w-full flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background shadow-sm",
        {
          "border-none shadow-lg outline-none transition-[outline-offset] duration-200 hover:outline hover:outline-2 hover:[outline-color:rgba(0,0,0,0.1)] hover:outline-offset-4":
            _default === "hover",
        },
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {headerSlot ? (
        <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-4 py-4">
          {headerSlot}
        </div>
      ) : null}
      {mainSlot ? (
        <div className="flex w-full flex-col items-start">{mainSlot}</div>
      ) : null}
      {footerSlot ? (
        <div className="flex w-full flex-col items-start gap-4 border-t border-solid border-neutral-border px-4 py-4">
          {footerSlot}
        </div>
      ) : null}
    </div>
  );
});

export const ProtoManualTask = ProtoManualTaskRoot;
