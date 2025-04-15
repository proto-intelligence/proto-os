"use client";
/*
 * Documentation:
 * Badge Row — https://app.subframe.com/0bee54e10183/library?component=Badge+Row_a2a19af7-898d-486a-9ddc-efb7a0b0be6c
 * Filter Badge — https://app.subframe.com/0bee54e10183/library?component=Filter+Badge_9f379f68-a795-4bb7-a975-8b10f72f2f30
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { FilterBadge } from "./FilterBadge";

interface BadgeRowRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const BadgeRowRoot = React.forwardRef<HTMLElement, BadgeRowRootProps>(
  function BadgeRowRoot({ className, ...otherProps }: BadgeRowRootProps, ref) {
    return (
      <div
        className={SubframeCore.twClassNames(
          "flex items-start gap-2",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <FilterBadge label="Company" count="3" />
        <FilterBadge label="Company" count="3" />
        <FilterBadge label="Company" count="3" />
        <FilterBadge label="Company" count="3" />
      </div>
    );
  }
);

export const BadgeRow = BadgeRowRoot;
