"use client";
/*
 * Documentation:
 * Proto Task Type — https://app.subframe.com/8616996521e5/library?component=Proto+Task+Type_20cb2dcb-f68d-4e6c-98b6-564c326a9579
 * Avatar — https://app.subframe.com/8616996521e5/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface ProtoTaskTypeRootProps extends React.HTMLAttributes<HTMLDivElement> {
  headerSlot?: React.ReactNode;
  mainSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  className?: string;
}

const ProtoTaskTypeRoot = React.forwardRef<HTMLElement, ProtoTaskTypeRootProps>(
  function ProtoTaskTypeRoot(
    {
      headerSlot,
      mainSlot,
      footerSlot,
      className,
      ...otherProps
    }: ProtoTaskTypeRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex flex-col items-start gap-2",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex w-full items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
            {headerSlot ? (
              <div className="flex w-full items-center gap-2 px-4 py-4">
                {headerSlot}
              </div>
            ) : null}
            {mainSlot ? (
              <div className="flex w-full flex-col items-start">{mainSlot}</div>
            ) : null}
            {footerSlot ? (
              <div className="flex w-full flex-col items-start gap-4 px-4 py-4">
                {footerSlot}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);

export const ProtoTaskType = ProtoTaskTypeRoot;
