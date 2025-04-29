"use client";
/*
 * Documentation:
 * Proto Browser Task — https://app.subframe.com/8616996521e5/library?component=Proto+Browser+Task_cd223006-b69e-465e-bd3b-228a60de98a8
 * Proto Avatar — https://app.subframe.com/8616996521e5/library?component=Proto+Avatar_9774174f-f47f-48fe-9c03-bf67a4069b62
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { FeatherCheck } from "@subframe/core";

interface ProtoBrowserTaskRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  footerSlot?: React.ReactNode;
  mainSlot?: React.ReactNode;
  headerSlot?: React.ReactNode;
  variant?: "default";
  className?: string;
}

const ProtoBrowserTaskRoot = React.forwardRef<
  HTMLElement,
  ProtoBrowserTaskRootProps
>(function ProtoBrowserTaskRoot(
  {
    footerSlot,
    mainSlot,
    headerSlot,
    variant = "default",
    className,
    ...otherProps
  }: ProtoBrowserTaskRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background shadow-sm",
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

export const ProtoBrowserTask = ProtoBrowserTaskRoot;
