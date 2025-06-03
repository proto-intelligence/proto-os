"use client";
/*
 * Documentation:
 * Proto External Vendor Task — https://app.subframe.com/61fe868f53c4/library?component=Proto+External+Vendor+Task_beeede27-86da-40e0-9e50-5497576018c3
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { FeatherCheck } from "@subframe/core";

interface ProtoExternalVendorTaskRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  footerSlot?: React.ReactNode;
  mainSlot?: React.ReactNode;
  headerSlot?: React.ReactNode;
  variant?: "default";
  className?: string;
}

const ProtoExternalVendorTaskRoot = React.forwardRef<
  HTMLElement,
  ProtoExternalVendorTaskRootProps
>(function ProtoExternalVendorTaskRoot(
  {
    footerSlot,
    mainSlot,
    headerSlot,
    variant = "default",
    className,
    ...otherProps
  }: ProtoExternalVendorTaskRootProps,
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

export const ProtoExternalVendorTask = ProtoExternalVendorTaskRoot;
