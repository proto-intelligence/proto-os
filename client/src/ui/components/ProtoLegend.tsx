"use client";
/*
 * Documentation:
 * Proto Legend — https://app.subframe.com/8616996521e5/library?component=Proto+Legend_305dbfbc-c664-4de4-86f3-5d403c50acf3
 * Proto Legend Row — https://app.subframe.com/8616996521e5/library?component=Proto+Legend+Row_2c16e5c6-d5c5-4c91-a6f0-b4993663ed06
 */

import React from "react";
import * as SubframeUtils from "../utils";

interface ProtoLegendRootProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  taskTypesSlot?: React.ReactNode;
  className?: string;
}

const ProtoLegendRoot = React.forwardRef<HTMLElement, ProtoLegendRootProps>(
  function ProtoLegendRoot(
    { text, taskTypesSlot, className, ...otherProps }: ProtoLegendRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "flex w-60 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {text ? (
          <span className="text-heading-3 font-heading-3 text-default-font">
            {text}
          </span>
        ) : null}
        {taskTypesSlot ? (
          <div className="flex w-full flex-col items-center gap-3">
            {taskTypesSlot}
          </div>
        ) : null}
      </div>
    );
  }
);

export const ProtoLegend = ProtoLegendRoot;
