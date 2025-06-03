"use client";
/*
 * Documentation:
 * Proto Floating Toolbar — https://app.subframe.com/61fe868f53c4/library?component=Proto+Floating+Toolbar_98eb3d13-4d73-4472-9b7e-57e1e4c27d60
 * Button — https://app.subframe.com/61fe868f53c4/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Select — https://app.subframe.com/61fe868f53c4/library?component=Select_bb88f90b-8c43-4b73-9c2f-3558ce7838f3
 * Icon Button — https://app.subframe.com/61fe868f53c4/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import * as SubframeCore from "@subframe/core";

interface ProtoFloatingToolbarRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  iconButtonSlots?: React.ReactNode;
  taskSearchBar?: React.ReactNode;
  workflow?: React.ReactNode;
  className?: string;
}

const ProtoFloatingToolbarRoot = React.forwardRef<
  HTMLElement,
  ProtoFloatingToolbarRootProps
>(function ProtoFloatingToolbarRoot(
  {
    iconButtonSlots,
    taskSearchBar,
    workflow,
    className,
    ...otherProps
  }: ProtoFloatingToolbarRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex w-full max-w-[768px] items-start justify-center gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-lg",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {workflow ? (
        <div className="flex items-center justify-center gap-1 self-stretch">
          {workflow}
        </div>
      ) : null}
      {taskSearchBar ? (
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 px-1 py-1">
          {taskSearchBar}
        </div>
      ) : null}
      {iconButtonSlots ? (
        <div className="flex grow shrink-0 basis-0 items-center justify-center gap-1 self-stretch">
          {iconButtonSlots}
        </div>
      ) : null}
    </div>
  );
});

export const ProtoFloatingToolbar = ProtoFloatingToolbarRoot;
