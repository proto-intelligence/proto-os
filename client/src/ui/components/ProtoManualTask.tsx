"use client";
/*
 * Documentation:
 * Proto Manual Task — https://app.subframe.com/61fe868f53c4/library?component=Proto+Manual+Task_20cb2dcb-f68d-4e6c-98b6-564c326a9579
 * Proto Avatar — https://app.subframe.com/61fe868f53c4/library?component=Proto+Avatar_9774174f-f47f-48fe-9c03-bf67a4069b62
 * Badge — https://app.subframe.com/61fe868f53c4/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { FeatherCheck } from "@subframe/core";

interface ProtoManualTaskRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  footerSlot?: React.ReactNode;
  mainSlot?: React.ReactNode;
  headerSlot?: React.ReactNode;
  _default?: "default" | "hover" | "pressed";
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
          "border border-solid border-secondary-2": _default === "pressed",
          "border border-solid border-brand-200 shadow-lg":
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
